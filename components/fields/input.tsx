export default function InputField({ field, form, label, ...props }: {field: any, form?: any, label?: string})
{
    return (
    <div className="mb-3">
        <label className="block mb-2 text-sm font-medium text-gray-900">{label || field.name}</label>
        <input {...field} {...props}  className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`} />
    </div>
    )
}