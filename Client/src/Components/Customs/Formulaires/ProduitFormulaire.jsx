import { Loader, Plus, X } from 'lucide-react'
import { useState } from 'react'
import { useModalStore } from '../../../Hooks/Stores/useModalStore'
import { InitialData } from '../../../Lib/Utils/InitialData'
import { useProductStore } from '../../../Hooks/Stores/useProductStore'
import  toast  from 'react-hot-toast'

const ProduitFormulaire = () => {
    const { CloseModal } = useModalStore()
    const { autreColor, description: initialDescription, ...rest } = InitialData.Produit
    const [description, setDescription] = useState(initialDescription)
    const [restData, setRestData] = useState(rest)
    const [otherColors, setOtherColors] = useState(autreColor)
    const { addProduct } = useProductStore()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSpecification = {
        add: () => {
            setDescription(prev => ({
                ...prev,
                specification: [...prev.specification, '']
            }))
        },
        remove: (index) => {
            setDescription(prev => ({
                ...prev,
                specification: prev.specification.filter((_, i) => i !== index)
            }))
        },
        update: (index, value) => {
            setDescription(prev => {
                const updated = [...prev.specification]
                updated[index] = value
                return { ...prev, specification: updated }
            })
        }
    }

    const handleColors = {
        add: () => setOtherColors(prev => [...prev, { image: "", color: "" }]),
        remove: (index) => setOtherColors(prev => prev.filter((_, i) => i !== index)),
        update: (index, field, value) => {
            setOtherColors(prev =>
                prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
            )
        }
    }

    const handleChange = (e) => {
        const { name, value, files } = e.target
        setRestData(prev => ({
            ...prev,
            [name]: files?.[0] || value
        }))
    }

    const handleDescriptionChange = (e, type) => {
        setDescription(prev => ({
            ...prev,
            [type]: e.target.value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)

        const requiredFields = [
            !restData.nom && "Product name",
            !restData.marque && "Brand",
            !restData.prix && "Price",
            !description.generale && "General description",
            !restData.image && "Main image"
        ].filter(Boolean)

        if (requiredFields.length > 0) {
            toast.error(`Missing fields: ${requiredFields.join(', ')}`)
            setIsSubmitting(false)
            return
        }

        try {
            const formData = new FormData()
            Object.entries(restData).forEach(([key, value]) => {
                if (value) formData.append(key, value)
            })

            formData.append("description", JSON.stringify(description))

            otherColors.forEach((item, index) => {
                if (item.image) formData.append(`autreColor[${index}][image]`, item.image)
                if (item.color) formData.append(`autreColor[${index}][color]`, item.color)
            })

            const success = await addProduct(formData)
            if (success) {
                toast.success("Product added successfully!");
                setRestData(rest);
                setDescription(initialDescription);
                setOtherColors(autreColor);
                CloseModal();
            }
            console.log("FormData",formData);
        } catch (error) {
            console.error("Error while adding the product", error)
            toast.error(error.response?.data?.message || "Error while adding the product")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="px-2 md:px-0 py-3">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-xl mx-auto flex flex-col shadow-lg py-5 px-4 md:px-6 z-50 border border-gray-200 bg-white rounded-lg max-h-[90vh] overflow-y-auto"
            >
                <div className="border-b border-gray-200 flex items-center justify-between py-3">
                    <h3 className="text-xl text-gray-700 font-semibold">
                        Product <span className="hidden md:inline-block">Form</span>
                    </h3>
                    <button
                        type="button"
                        onClick={CloseModal}
                        className="size-8 rounded-full flex items-center justify-center cursor-pointer transition-colors duration-300 hover:bg-red-200 hover:text-white"
                    >
                        <X className="size-5" />
                    </button>
                </div>

                <div className="flex flex-col gap-3 mt-4">
                    <div>
                        <label className="block text-gray-700 text-sm font-semibold">Product image*</label>
                        <input
                            type="file"
                            name="image"
                            onChange={handleChange}
                            accept="image/*"
                            required
                            className="w-full px-4 py-2 border-b border-gray-300 focus:border-b focus:border-blue-500 outline-none transition-colors cursor-pointer"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-semibold">Product name*</label>
                        <input
                            type="text"
                            name="nom"
                            value={restData.nom}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border-b border-gray-300 focus:border-b focus:border-blue-500 outline-none transition-colors"
                        />
                    </div>

                    <div>
                        <label className="text-gray-700 text-sm font-semibold">Brand*</label>
                        <input
                            type="text"
                            name="marque"
                            value={restData.marque}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border-b border-gray-300 focus:border-b focus:border-blue-500 outline-none transition-colors"
                        />
                    </div>  

                    <div>
                        <label className="text-gray-700 text-sm font-semibold">Price*</label>
                        <input
                            type="text"
                            name="prix"
                            value={restData.prix || ''}
                            onChange={handleChange}
                            required
                            min="0"
                            step="0.01"
                            className="w-full px-4 py-2 border-b border-gray-300 focus:border-b focus:border-blue-500 outline-none transition-colors "
                        />
                    </div>

                    <div className="border border-gray-300 my-2 p-3 rounded-md">
                        <h3 className="font-semibold text-base text-gray-700 pb-2">Description</h3>

                        <div>
                            <label className="text-gray-700 text-sm font-semibold">General description*</label>
                            <textarea
                                name="generale"
                                value={description.generale}
                                onChange={(e) => handleDescriptionChange(e, "generale")}
                                required
                                className="w-full px-4 py-2 border-b border-gray-300 focus:border-b focus:border-blue-500 outline-none transition-colors "
                                rows="2"
                            />
                        </div>

                        <div className="mt-4">
                            <label className="text-gray-700 text-sm font-semibold">Specifications</label>

                            {description.specification.map((spec, index) => (
                                <div key={index} className="flex items-center gap-2 mt-2">
                                    <input
                                        type="text"
                                        value={spec}
                                        onChange={(e) => handleSpecification.update(index, e.target.value)}
                                        className="w-full px-4 py-2 border-b border-gray-300 focus:border-b focus:border-blue-500 outline-none transition-colors "
                                        placeholder={`Specification ${index + 1}`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleSpecification.remove(index)}
                                        className="text-red-500 hover:text-red-700"
                                        aria-label="Delete"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            ))}

                            <button
                                type="button"
                                onClick={handleSpecification.add}
                                className="mt-3 text-sm text-blue-600 hover:underline flex items-center gap-1"
                            >
                                <Plus className="size-3" /> Add a specification
                            </button>
                        </div>
                    </div>

                    <div className="border border-gray-300 my-2 p-3 rounded-md">
                        <h3 className="font-semibold text-gray-700 pb-2 text-base">Other colors</h3>

                        {otherColors.map((item, index) => (
                            <div key={index} className="border p-3 rounded-md mb-3">
                                <div className="flex items-start justify-between">
                                    <div className="w-full">
                                        <label className="text-gray-700 text-sm font-semibold">Image for this color</label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleColors.update(index, 'image', e.target.files[0])}
                                            className="w-full px-4 py-2 border-b border-gray-300 focus:border-b focus:border-blue-500 outline-none transition-colors cursor-pointer"
                                        />

                                        <label className="text-gray-700 text-sm font-semibold mt-3 block">Color name</label>
                                        <input
                                            type="text"
                                            value={item.color}
                                            onChange={(e) => handleColors.update(index, 'color', e.target.value)}
                                            className="w-full px-4 py-2 border-b border-gray-300 focus:border-b focus:border-blue-500 outline-none transition-colors "
                                            placeholder={`Color ${index + 1}`}
                                        />
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => handleColors.remove(index)}
                                        className="ml-3 mt-1 text-red-500 hover:text-red-700"
                                        aria-label="Delete"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={handleColors.add}
                            className="mt-2 text-sm text-blue-600 hover:underline flex items-center gap-1"
                        >
                            <Plus className="size-3" /> Add another color
                        </button>
                    </div>
                </div>

                <div className="mt-4">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="border border-blue-600 bg-blue-100 text-blue-600 px-5 py-2 rounded-lg hover:bg-blue-700 hover:text-white transition duration-200 flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? (
                            <Loader className="size-6 animate-spin" />
                        ) : (
                            <>
                                <Plus className="size-4" /> Add
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ProduitFormulaire
