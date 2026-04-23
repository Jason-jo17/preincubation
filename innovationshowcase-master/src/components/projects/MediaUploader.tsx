'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { supabase } from '@/lib/supabase';

interface MediaItem {
  id: string;
  type: 'IMAGE' | 'VIDEO' | 'GIF' | 'DOCUMENT' | 'DIAGRAM';
  url: string;
  caption: string;
  order: number;
  thumbnail?: string;
}

interface MediaUploaderProps {
  value?: MediaItem[];
  onChange: (value: MediaItem[]) => void;
  maxItems?: number;
}

export function MediaUploader({ value = [], onChange, maxItems = 10 }: MediaUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (value.length + acceptedFiles.length > maxItems) {
      alert(`Maximum ${maxItems} media items allowed`);
      return;
    }

    setUploading(true);
    const newMedia: MediaItem[] = [];

    for (const file of acceptedFiles) {
      const fileId = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
      setUploadProgress(prev => ({ ...prev, [fileId]: 0 }));

      // Determine media type
      let mediaType: MediaItem['type'] = 'IMAGE';
      if (file.type.startsWith('video/')) mediaType = 'VIDEO';
      else if (file.type === 'image/gif') mediaType = 'GIF';
      else if (file.type === 'application/pdf') mediaType = 'DOCUMENT';

      // Upload to Supabase Storage
      const filePath = `projects/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
      
      try {
        const { data, error } = await supabase.storage
          .from('project-media')
          .upload(filePath, file, {
            upsert: true,
            // onUploadProgress is not directly available in standard upload method without extra config
          });

        if (error) {
          console.error('Upload error:', error);
          continue;
        }

        // Get public URL
        const { data: urlData } = supabase.storage
          .from('project-media')
          .getPublicUrl(filePath);

        // Generate thumbnail for videos (Simplified for this version)
        let thumbnail: string | undefined;
        if (mediaType === 'VIDEO') {
          // In a real app, you'd use a serverless function or browser-side generation
          // thumbnail = await generateVideoThumbnail(file);
        }

        newMedia.push({
          id: fileId,
          type: mediaType,
          url: urlData.publicUrl,
          caption: '',
          order: value.length + newMedia.length,
          thumbnail,
        });
      } catch (err) {
        console.error('Unexpected error during upload:', err);
      }
    }

    onChange([...value, ...newMedia]);
    setUploading(false);
    setUploadProgress({});
  }, [value, onChange, maxItems]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
      'video/*': ['.mp4', '.webm', '.mov'],
      'application/pdf': ['.pdf'],
    },
    maxSize: 50 * 1024 * 1024, // 50MB
  });

  const reorderMedia = (fromIndex: number, toIndex: number) => {
    const newMedia = [...value];
    const [removed] = newMedia.splice(fromIndex, 1);
    newMedia.splice(toIndex, 0, removed);
    onChange(newMedia.map((m, i) => ({ ...m, order: i })));
  };

  const updateCaption = (id: string, caption: string) => {
    onChange(value.map(m => m.id === id ? { ...m, caption } : m));
  };

  const removeMedia = (id: string) => {
    onChange(value.filter(m => m.id !== id));
  };

  return (
    <div className="space-y-4">
      {/* Drop Zone */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
          isDragActive
            ? 'border-amber-500 bg-amber-500/5 shadow-sm'
            : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 shadow-sm'
        }`}
      >
        <input {...getInputProps()} />
        <div className="text-4xl mb-3">
          {isDragActive ? '📥' : '📤'}
        </div>
        <p className="text-slate-600 font-medium">
          {isDragActive
            ? 'Drop files here...'
            : 'Drag & drop images, videos, or documents'}
        </p>
        <p className="text-sm text-slate-400 mt-2 font-medium">
          PNG, JPG, GIF, MP4, WebM, PDF up to 50MB
        </p>
      </div>

      {/* Upload Progress */}
      {uploading && (
        <div className="space-y-2">
          {Object.entries(uploadProgress).map(([fileId, progress]) => (
            <div key={fileId} className="flex items-center gap-3">
              <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-500 transition-all shadow-[0_0_10px_rgba(245,158,11,0.2)]"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-sm text-slate-500 font-bold">{progress}%</span>
            </div>
          ))}
        </div>
      )}

      {/* Media Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {value.map((media, index) => (
          <div
            key={media.id}
            className="relative group rounded-xl overflow-hidden bg-white border border-slate-200 shadow-sm transition-all hover:shadow-md"
            draggable
            onDragStart={(e) => e.dataTransfer.setData('text/plain', index.toString())}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const fromIndex = parseInt(e.dataTransfer.getData('text/plain'));
              reorderMedia(fromIndex, index);
            }}
          >
            {/* Media Preview */}
            <div className="aspect-video relative">
              {media.type === 'IMAGE' || media.type === 'GIF' ? (
                <img
                  src={media.url}
                  alt={media.caption}
                  className="w-full h-full object-cover"
                />
              ) : media.type === 'VIDEO' ? (
                <div className="relative w-full h-full">
                  {media.thumbnail ? (
                    <img
                      src={media.thumbnail}
                      alt="Video thumbnail"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <video
                      src={media.url}
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                    <div className="w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center">
                      <span className="text-sm">▶️</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-50">
                  <span className="text-4xl">📄</span>
                </div>
              )}
            </div>

            {/* Overlay Controls */}
            <div className="absolute inset-0 bg-white/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex flex-col">
              <div className="flex-1 flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => window.open(media.url, '_blank')}
                  className="p-2.5 bg-slate-100 rounded-xl hover:bg-slate-200 transition-all text-slate-700 shadow-sm"
                >
                  <span className="text-sm">👁️</span>
                </button>
                <button
                  type="button"
                  onClick={() => removeMedia(media.id)}
                  className="p-2.5 bg-red-50 rounded-xl hover:bg-red-500 hover:text-white transition-all text-red-500 shadow-sm"
                >
                  <span className="text-sm">🗑️</span>
                </button>
              </div>
              <input
                type="text"
                value={media.caption}
                onChange={(e) => updateCaption(media.id, e.target.value)}
                placeholder="Add caption..."
                className="m-3 px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500/50 shadow-inner"
              />
            </div>

            {/* Type Badge */}
            <div className="absolute top-2 left-2 px-2 py-0.5 text-[8px] uppercase font-black tracking-[0.1em] rounded-md bg-white/90 border border-slate-200 text-slate-800 shadow-sm backdrop-blur-md">
              {media.type}
            </div>

            {/* Order Badge */}
            <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-amber-500 text-white text-[9px] flex items-center justify-center font-black shadow-lg">
              {index + 1}
            </div>
          </div>
        ))}
      </div>

      {/* YouTube/External Video Input */}
      <div className="border border-slate-200 rounded-2xl p-6 bg-white shadow-sm overflow-hidden relative group">
        <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-all duration-700" />
        <h4 className="text-sm font-black text-slate-800 mb-4 flex items-center gap-2 relative z-10">
           <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center">🔗</div>
           Or add external video URL
        </h4>
        <div className="flex gap-3 relative z-10">
          <input
            type="url"
            placeholder="YouTube, Vimeo, or Loom URL"
            className="flex-1 bg-slate-50 border-2 border-slate-50 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500/30 focus:bg-white transition-all shadow-sm"
            id="external-video-url"
          />
          <button
            type="button"
            onClick={() => {
              const input = document.getElementById('external-video-url') as HTMLInputElement;
              const url = input.value.trim();
              if (url) {
                onChange([
                  ...value,
                  {
                    id: `external-${Date.now()}`,
                    type: 'VIDEO',
                    url,
                    caption: '',
                    order: value.length,
                  }
                ]);
                input.value = '';
              }
            }}
            className="px-6 py-3 bg-slate-900 hover:bg-black text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-lg active:scale-95"
          >
            Add Video
          </button>
        </div>
      </div>
    </div>
  );
}
