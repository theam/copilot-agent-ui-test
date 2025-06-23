import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Card } from 'primereact/card';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { useForm } from 'react-hook-form';
import { UserMockApi } from '@/api/mock-api.ts';
import type { CreateUserDto, UpdateUserDto, UserDto } from '@/api/mock-api.ts';
import { useUserStore } from '@/lib/userStore';
import EditUserForm from '@/components/EditUserForm';

const UsersPage: React.FC = () => {
  const { users, setUsers, updateUser } = useUserStore();
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editingUser, setEditingUser] = useState<UserDto | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<CreateUserDto>();

  const fetchUsers = () => {
    setLoading(true);
    UserMockApi.getUsers().then((data) => {
      setUsers(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchUsers();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit = async (data: CreateUserDto) => {
    setSubmitting(true);
    await UserMockApi.createUser(data);
    setShowDialog(false);
    reset();
    setSubmitting(false);
    fetchUsers();
  };

  const handleEditUser = (user: UserDto) => {
    setEditingUser(user);
    setShowEditDialog(true);
  };

  const onEditSubmit = async (data: UpdateUserDto) => {
    if (!editingUser) return;
    
    setSubmitting(true);
    const updatedUser = await UserMockApi.updateUser(editingUser.userId, data);
    if (updatedUser) {
      updateUser(editingUser.userId, updatedUser);
    }
    setShowEditDialog(false);
    setEditingUser(null);
    setSubmitting(false);
  };

  const handleEditCancel = () => {
    setShowEditDialog(false);
    setEditingUser(null);
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
      <Card className="w-full max-w-5xl shadow-xl rounded-2xl border border-slate-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-slate-800">Users</h2>
          <Button icon="pi pi-plus" label="Add User" className="p-button-primary" onClick={() => setShowDialog(true)} />
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <ProgressSpinner />
          </div>
        ) : (
          <DataTable
            value={users}
            paginator
            rows={5}
            stripedRows
            showGridlines
            className="modern-table"
            rowHover
            responsiveLayout="scroll"
            style={{ borderRadius: '1rem', overflow: 'hidden' }}
            data-testid="users-table"
          >
            <Column field="userId" header="ID" style={{ minWidth: '60px' }} />
            <Column field="name" header="Name" style={{ minWidth: '150px' }} />
            <Column field="username" header="Username" style={{ minWidth: '120px' }} />
            <Column field="email" header="Email" style={{ minWidth: '200px' }} />
            <Column field="userTin" header="TIN" style={{ minWidth: '120px' }} />
            <Column field="phone" header="Phone" style={{ minWidth: '120px' }} />
            <Column 
              header="Actions" 
              style={{ minWidth: '100px' }}
              body={(user: UserDto) => (
                <Button 
                  icon="pi pi-pencil" 
                  label="Edit" 
                  size="small"
                  onClick={() => handleEditUser(user)}
                  className="p-button-text p-button-sm"
                />
              )}
            />
          </DataTable>
        )}
        <Dialog
          header="Add New User"
          visible={showDialog}
          style={{ width: '400px' }}
          onHide={() => { setShowDialog(false); reset(); }}
          footer={
            <div>
              <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={() => { setShowDialog(false); reset(); }} />
              <Button label="Add" icon="pi pi-check" loading={submitting} onClick={handleSubmit(onSubmit)} autoFocus />
            </div>
          }
        >
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" data-testid="add-user-form">
            <span className="p-float-label">
              <InputText id="name" className="w-full" {...register('name', { required: 'Name is required' })} />
              <label htmlFor="name">Name</label>
            </span>
            {errors.name && <small className="p-error">{errors.name.message}</small>}
            <span className="p-float-label">
              <InputText id="username" className="w-full" {...register('username', { required: 'Username is required' })} />
              <label htmlFor="username">Username</label>
            </span>
            {errors.username && <small className="p-error">{errors.username.message}</small>}
            <span className="p-float-label">
              <InputText id="email" className="w-full" {...register('email', { required: 'Email is required' })} />
              <label htmlFor="email">Email</label>
            </span>
            {errors.email && <small className="p-error">{errors.email.message}</small>}
            <span className="p-float-label">
              <InputText id="userTin" className="w-full" {...register('userTin', { required: 'TIN is required' })} />
              <label htmlFor="userTin">TIN</label>
            </span>
            {errors.userTin && <small className="p-error">{errors.userTin.message}</small>}
            <span className="p-float-label">
              <InputText id="phone" className="w-full" {...register('phone', { required: 'Phone is required' })} />
              <label htmlFor="phone">Phone</label>
            </span>
            {errors.phone && <small className="p-error">{errors.phone.message}</small>}
            <span className="p-float-label">
              <InputText id="website" className="w-full" {...register('website')} />
              <label htmlFor="website">Website</label>
            </span>
          </form>
        </Dialog>
        <Dialog
          header="Edit User"
          visible={showEditDialog}
          style={{ width: '400px' }}
          onHide={handleEditCancel}
          footer={
            <div>
              <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={handleEditCancel} />
              <Button label="Update" icon="pi pi-check" loading={submitting} form="edit-user-form" type="submit" autoFocus />
            </div>
          }
        >
          <EditUserForm 
            user={editingUser} 
            onSubmit={onEditSubmit}
          />
        </Dialog>
      </Card>
    </div>
  );
};

export default UsersPage; 