import { createContext, useContext, useId } from 'react'
import { FormFieldContextValue } from './form.types'
import { useFormContext } from 'react-hook-form'

export const FormFieldContext = createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
)

export const useFormField = () => {
  const fieldContext = useContext(FormFieldContext)
  const { getFieldState, formState } = useFormContext()

  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext) {
    throw new Error('useFormField must be used within a <FormField>')
  }

  const id = useId()

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-description`,
    formMessageId: `${id}-form-message`,
    ...fieldState,
  }
}
