import { Combobox, Transition } from '@headlessui/react';
import { Fragment, useMemo, useState } from 'react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline';

interface TargetsMultiSelectProps {
  value: string[];
  options: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
}

export const TargetsMultiSelect: React.FC<TargetsMultiSelectProps> = ({ value, options, onChange, placeholder }) => {
  const [query, setQuery] = useState('');

  const filteredOptions = useMemo(() => {
    const normalized = query.toLowerCase();
    if (!normalized) return options;
    return options.filter((option) => option.toLowerCase().includes(normalized));
  }, [options, query]);

  return (
    <Combobox value={value} onChange={(selection) => onChange(selection)} multiple>
      <div className="relative">
        <div className="relative w-full cursor-default overflow-hidden rounded-lg border border-slate-300 bg-white text-left focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-200">
          <Combobox.Input
            className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-slate-900 focus:outline-none"
            displayValue={() => value.join(', ')}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={placeholder ?? 'Select targets'}
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon className="h-5 w-5 text-slate-400" aria-hidden="true" />
          </Combobox.Button>
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery('')}
        >
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
            {filteredOptions.length === 0 ? (
              <div className="relative cursor-default select-none px-4 py-2 text-slate-500">No targets found.</div>
            ) : (
              filteredOptions.map((option) => (
                <Combobox.Option
                  key={option}
                  value={option}
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-primary-100 text-primary-900' : 'text-slate-900'
                    }`
                  }
                >
                  {({ selected }) => (
                    <>
                      <span className={`block truncate ${selected ? 'font-semibold' : 'font-normal'}`}>{option}</span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  );
};
