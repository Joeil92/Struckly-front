import { useController, useForm } from 'react-hook-form'
import { CreateOrganization } from './create-organization.types'
import { useCreateOrganizationMutation } from './create-organization.mutation'
import { Input, Label } from '../../../shared/ui/form'
import { useTranslation } from 'react-i18next'
import { Button } from '../../../shared/ui/button'
import { Select } from '../../../shared/ui/select'
import { Option } from '../../../shared/ui/select/Select'
import { SingleValue } from 'react-select'
import { useToast } from '../../../shared/lib/toast/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { CreateOrganizationSchema } from './create-organization.schemas'

const sizeList = [
  { value: '1-9', label: '1-9' },
  { value: '10-99', label: '10-99' },
  { value: '100-499', label: '100-499' },
  { value: '500-999', label: '500-999' },
  { value: '1000+', label: '1000+' },
]

export function CreateOrganizationForm() {
  const { t } = useTranslation()
  const { addToast } = useToast()
  const {
    handleSubmit,
    register,
    formState: { errors, isValid, isDirty },
    control,
  } = useForm<CreateOrganization>({
    resolver: zodResolver(CreateOrganizationSchema),
    defaultValues: {
      name: '',
      country: '',
      size: '1-9',
    },
  })

  const { value: sizeValue, onChange: onSizeChange } = useController({
    name: 'size',
    control,
  }).field

  const { isPending, mutate } = useCreateOrganizationMutation({
    onError: (error) => {
      if (error.statusCode === 409) {
        addToast({
          title: t(
            'create-organization.form.errors.user-already-has-an-organization.title'
          ),
          content: t(
            'create-organization.form.errors.user-already-has-an-organization.description'
          ),
          variant: 'danger',
        })
      } else {
        addToast({
          title: t('common.errors.unknown.title'),
          content: t('common.errors.unknown.description'),
          variant: 'danger',
        })
      }
    },
  })

  const canSubmit = [isDirty, isValid, !isPending].every(Boolean)

  const onValid = (data: CreateOrganization) => {
    mutate(data)
  }

  return (
    <form
      onSubmit={handleSubmit(onValid)}
      className="flex w-full flex-col gap-8"
    >
      <fieldset disabled={isPending}>
        <Label isError={!!errors.name}>
          {t('create-organization.form.labels.name')}
        </Label>
        <Input
          placeholder={t('create-organization.form.placeholders.name')}
          isError={!!errors.name}
          {...register('name')}
        />
      </fieldset>
      <fieldset disabled={isPending}>
        <Label isError={!!errors.country}>
          {t('create-organization.form.labels.country')}
        </Label>
        <Input
          placeholder={t('create-organization.form.placeholders.country')}
          isError={!!errors.country}
          {...register('country')}
        />
      </fieldset>
      <fieldset disabled={isPending}>
        <Label htmlFor="size" isError={!!errors.size}>
          {t('create-organization.form.labels.size')}
        </Label>
        <Select
          name="size"
          placeholder={t('create-organization.form.placeholders.size')}
          isError={!!errors.size}
          options={sizeList}
          value={
            sizeValue
              ? sizeList.find((option) => option.value === sizeValue)
              : sizeValue
          }
          onChange={(option: SingleValue<Option>) =>
            onSizeChange(option ? option.value : '')
          }
        />
      </fieldset>
      <Button type="submit" disabled={!canSubmit}>
        {t('create-organization.form.submit')}
      </Button>
    </form>
  )
}
