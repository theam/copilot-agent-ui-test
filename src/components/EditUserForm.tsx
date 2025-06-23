import React, { useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { useForm } from 'react-hook-form';
import type { UpdateUserDto, UserDto } from '@/api/mock-api.ts';

interface EditUserFormProps {
  user: UserDto | null;
  onSubmit: (data: UpdateUserDto) => void;
}

const EditUserForm: React.FC<EditUserFormProps> = ({ user, onSubmit }) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<UpdateUserDto>();

  useEffect(() => {
    if (user) {
      // Pre-populate form with current user data
      setValue('name', user.name);
      setValue('username', user.username);
      setValue('email', user.email);
      setValue('userTin', user.userTin);
      setValue('phone', user.phone);
      setValue('website', user.website || '');
    }
  }, [user, setValue]);

  return (
    <form id="edit-user-form" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" data-testid="edit-user-form">
      <span className="p-float-label">
        <InputText id="editName" className="w-full" {...register('name')} />
        <label htmlFor="editName">Name</label>
      </span>
      {errors.name && <small className="p-error">{errors.name.message}</small>}
      
      <span className="p-float-label">
        <InputText id="editUsername" className="w-full" {...register('username')} />
        <label htmlFor="editUsername">Username</label>
      </span>
      {errors.username && <small className="p-error">{errors.username.message}</small>}
      
      <span className="p-float-label">
        <InputText id="editEmail" className="w-full" {...register('email')} />
        <label htmlFor="editEmail">Email</label>
      </span>
      {errors.email && <small className="p-error">{errors.email.message}</small>}
      
      <span className="p-float-label">
        <InputText id="editUserTin" className="w-full" {...register('userTin')} />
        <label htmlFor="editUserTin">TIN</label>
      </span>
      {errors.userTin && <small className="p-error">{errors.userTin.message}</small>}
      
      <span className="p-float-label">
        <InputText id="editPhone" className="w-full" {...register('phone')} />
        <label htmlFor="editPhone">Phone</label>
      </span>
      {errors.phone && <small className="p-error">{errors.phone.message}</small>}
      
      <span className="p-float-label">
        <InputText id="editWebsite" className="w-full" {...register('website')} />
        <label htmlFor="editWebsite">Website</label>
      </span>
    </form>
  );
};

export default EditUserForm;