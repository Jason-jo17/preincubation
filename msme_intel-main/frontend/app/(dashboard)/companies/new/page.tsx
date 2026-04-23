import { CompanyForm } from '@/components/companies/company-form';
import { PageHeader } from '@/components/shared/page-header';

export default function NewCompanyPage() {
    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <PageHeader
                title="Add New Company"
                description="Enter the details of the company to add it to your portfolio."
            />

            <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
                <CompanyForm />
            </div>
        </div>
    );
}
