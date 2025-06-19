import React from 'react';
import { InputText } from 'primereact/inputtext';
import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import type { UpdateUserDto } from '@/api/mock-api.ts';

interface EditUserFormProps {
  register: UseFormRegister<UpdateUserDto>;
  errors: FieldErrors<UpdateUserDto>;
}

const EditUserForm: React.FC<EditUserFormProps> = ({ register, errors }) => {
  return (
    <div className="flex flex-col gap-4">
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
    </div>
  );
};

export default EditUserForm;