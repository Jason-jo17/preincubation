'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { companySchema, CompanyFormValues } from '@/lib/utils/validators';
import { useCreateCompany, useUpdateCompany } from '@/lib/hooks/use-companies';
import { useRouter } from 'next/navigation';
import { SECTORS } from '@/lib/constants/sectors';
import { Company } from '@/lib/types/company';

interface CompanyFormProps {
    initialData?: Company;
}

export function CompanyForm({ initialData }: CompanyFormProps) {
    const router = useRouter();
    const createCompany = useCreateCompany();
    const updateCompany = useUpdateCompany();

    const form = useForm<CompanyFormValues>({
        resolver: zodResolver(companySchema),
        defaultValues: initialData || {
            name: '',
            sub_sector: '',
            headquarters_city: '',
            headquarters_state: '',
            website: '',
            // @ts-ignore
            sector: undefined,
            // @ts-ignore
            stage: undefined,
        },
    });

    async function onSubmit(data: CompanyFormValues) {
        try {
            if (initialData) {
                await updateCompany.mutateAsync({ id: initialData.id, data });
            } else {
                await createCompany.mutateAsync(data);
            }
            router.push('/companies');
            router.refresh();
        } catch (error) {
            console.error('Failed to save company:', error);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid gap-6 md:grid-cols-2">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Company Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Acme Inc." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="website"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Website</FormLabel>
                                <FormControl>
                                    <Input placeholder="https://..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="sector"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Sector</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a sector" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {SECTORS.map((sector) => (
                                            <SelectItem key={sector.value} value={sector.value}>
                                                {sector.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="sub_sector"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Sub-Sector</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g. Payment Processing" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="stage"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Stage</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a stage" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="seed">Seed</SelectItem>
                                        <SelectItem value="early">Early</SelectItem>
                                        <SelectItem value="growth">Growth</SelectItem>
                                        <SelectItem value="mature">Mature</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="founded_year"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Founded Year</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        {...field}
                                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="headquarters_city"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>City</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="headquarters_state"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>State</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="employee_count"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Employees</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            {...field}
                                            onChange={(e) => field.onChange(parseInt(e.target.value))}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="revenue_current"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Revenue (Current)</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            {...field}
                                            onChange={(e) => field.onChange(parseInt(e.target.value))}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                </div>
                <div className="flex justify-end gap-4">
                    <Button type="button" variant="outline" onClick={() => router.back()}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={form.formState.isSubmitting}>
                        {form.formState.isSubmitting ? 'Saving...' : initialData ? 'Update Company' : 'Create Company'}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
