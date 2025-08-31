

export default function CategoryForm({ formData, handleChange, handleSubmit, loading }){
    return (
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className='grid md:grid-cols-3 gap-[2rem]'>
                <div className='md:col-span-2 shadow-lg rounded-[5px] h-fit '>
                    <div class="bg-[#66666622] px-[3rem] py-[1.5rem]">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                            Category Name *
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter category name"
                        />
                    </div>
                </div>
                <div className='md:col-span-1 shadow-lg rounded-[5px] h-fit'>
                    <div class="bg-[#66666622] px-[3rem] py-[1.5rem]">
                        <div class="bg-white p-[.5rem] flex">
                            <button type="submit" disabled={loading} class="ml-auto focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-xs px-4 py-2">{loading ? 'Saving...' : 'Submit'}</button>
                        </div>
                    </div>
                    <hr className='bg-white h-[8px]' />
                    <div class="bg-[#66666622] px-[3rem] py-[1.5rem]">
                        <div class="bg-white p-[.5rem] flex flex-col gap-[.4rem]">
                            <div class="flex flex-row items-center gap-[.4rem]">
                                <label for="is_active" class="lg:col-span-2 text-[#222] mb-0 text-left">Active:</label>
                                <input type="checkbox" name="is_active" id="is_active" class="bg-[#66666622] rounded-[5px_5px] border-gray-300" checked={formData.is_active} onChange={handleChange} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}