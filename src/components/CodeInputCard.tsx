import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { v4 as uuid } from 'uuid';
import { TargetsMultiSelect } from './TargetsMultiSelect';

interface CodeInputValues {
  code: string;
  targets: string[];
  idempotencyKey: string;
  audience?: string;
  issuer?: string;
}

interface CodeInputCardProps {
  defaultTargets: string[];
  onSubmit: (values: CodeInputValues) => void;
  loading?: boolean;
}

export const CodeInputCard: React.FC<CodeInputCardProps> = ({ defaultTargets, onSubmit, loading }) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<CodeInputValues>({
    defaultValues: {
      code: '',
      targets: [],
      idempotencyKey: uuid()
    }
  });

  const selectedTargets = watch('targets');

  useEffect(() => {
    if (!selectedTargets || selectedTargets.length === 0) {
      setValue('targets', defaultTargets);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTargetsChange = (targets: string[]) => {
    setValue('targets', targets);
  };

  const regenerateKey = () => {
    setValue('idempotencyKey', uuid(), { shouldDirty: true });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Broadcast Code</h2>
            <p className="mt-1 text-sm text-slate-600">
              Submit the code payload to trigger the multi-target broadcast job.
            </p>
          </div>
          <button
            type="button"
            className="text-sm font-medium text-primary-600 hover:text-primary-500"
            onClick={regenerateKey}
          >
            Regenerate Key
          </button>
        </div>
        <div className="mt-6 space-y-4">
          <div>
            <label htmlFor="code" className="block text-sm font-medium text-slate-700">
              Code
            </label>
            <textarea
              id="code"
              rows={4}
              className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
              placeholder="Enter the code to broadcast..."
              {...register('code', { required: 'Code is required' })}
            />
            {errors.code ? <p className="mt-1 text-sm text-red-600">{errors.code.message}</p> : null}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Targets</label>
            <TargetsMultiSelect
              value={selectedTargets}
              options={defaultTargets}
              onChange={handleTargetsChange}
              placeholder="Choose targets"
            />
            <p className="mt-1 text-xs text-slate-500">Leave empty to broadcast to all available targets.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label htmlFor="idempotency" className="block text-sm font-medium text-slate-700">
                Idempotency Key
              </label>
              <input
                id="idempotency"
                type="text"
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
                {...register('idempotencyKey', { required: 'Idempotency key is required' })}
              />
            </div>
            <div>
              <label htmlFor="audience" className="block text-sm font-medium text-slate-700">
                Custom Audience (optional)
              </label>
              <input
                id="audience"
                type="text"
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
                {...register('audience')}
              />
            </div>
            <div>
              <label htmlFor="issuer" className="block text-sm font-medium text-slate-700">
                Custom Issuer (optional)
              </label>
              <input
                id="issuer"
                type="text"
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
                {...register('issuer')}
              />
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Executing…' : 'Execute Broadcast'}
          </button>
        </div>
      </div>
    </form>
  );
};
