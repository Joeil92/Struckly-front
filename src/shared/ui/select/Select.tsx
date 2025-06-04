import { useTranslation } from 'react-i18next'
import ReactSelect, { SingleValue } from 'react-select'

export type Option = {
  value: string
  label: string
}

export interface SelectProps {
  name: string
  options: Option[]
  placeholder?: string
  isError?: boolean
  disabled?: boolean
  isClearable?: boolean
  value: Option | undefined
  onChange: (option: SingleValue<Option>) => void
}

export function Select({ isError = false, options, ...props }: SelectProps) {
  const { t } = useTranslation()

  return (
    <ReactSelect
      styles={{
        control: (base) => ({
          ...base,
          borderColor: isError
            ? 'var(--color-danger-300)'
            : 'var(--color-grey-300)',
          borderRadius: '3px',
          borderWidth: '1px',
          paddingTop: '4px',
          paddingBottom: '4px',
          ':focus': {
            borderColor: isError
              ? 'var(--color-danger-300)'
              : 'var(--color-primary-300)',
          },
          ':hover': {
            borderColor: isError
              ? 'var(--color-danger-300)'
              : 'var(--color-grey-300)',
          },
        }),
        placeholder: (base) => ({
          ...base,
          color: 'var(--color-grey-300)',
        }),
      }}
      options={options}
      noOptionsMessage={() => t('common.placeholders.no-options')}
      {...props}
      inputId={props.name}
    />
  )
}
