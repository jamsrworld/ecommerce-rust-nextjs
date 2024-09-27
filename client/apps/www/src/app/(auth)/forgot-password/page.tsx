import { ForgotPasswordFormContent } from "./_lib/components/form-content";

const page = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="container mx-auto max-w-lg overflow-hidden rounded-3xl md:my-8">
        <ForgotPasswordFormContent />
      </div>
    </div>
  );
};

export default page;
