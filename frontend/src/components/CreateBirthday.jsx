import { useState } from "react";
import { Label, TextInput, Button, Alert, Spinner } from "flowbite-react";
import { FiUpload, FiImage, FiGift } from "react-icons/fi";
import birthdayIllustration from "../assets/birthday-cake.jpg";

const CreateBirthday = () => {
    const [name, setName] = useState("");
    const [image, setImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        setLoading(true);

        const formData = new FormData();
        formData.append("name", name);
        if (image) {
            formData.append("image", image);
        }

        try {
            const response = await fetch("http://localhost:5000/api/birthday", {
                method: "POST",
                body: formData,
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || "Could not create birthday");
            }
            setSuccess(`Created a birthday page for "${data.name}" successfully!`);
            setName("");
            setImage(null);
            setPreviewUrl(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
                {/* Outer Card */}
                <div className="bg-white dark:bg-[#000000] rounded-xl shadow-lg overflow-hidden">
                    <div className="grid md:grid-cols-2 gap-6">

                        {/* Left Column: Illustration */}
                        <div className="relative hidden md:block">
                            {/* Darker gradient overlay for better text visibility on black */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#000000]/80 via-[#000000]/70 to-[#000000]/60" />
                            <img
                                src={birthdayIllustration || "/placeholder.svg"}
                                alt="Birthday"
                                className="h-full w-full object-cover"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center p-6">
                                    <FiGift className="w-16 h-16 mx-auto mb-4 text-white opacity-90" />
                                    <h2 className="text-3xl font-bold mb-3 text-white">
                                        Create a Birthday Page
                                    </h2>
                                    <p className="text-gray-100 text-lg">
                                        Make someone's special day even more memorable
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Form */}
                        <div className="p-6 md:p-8 lg:p-10">
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                    Create a Birthday Page
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Fill in the details to create a special birthday celebration
                                </p>
                            </div>

                            {error && (
                                <Alert color="failure" className="mb-4">
                                    <span className="font-medium">Error:</span> {error}
                                </Alert>
                            )}
                            {success && (
                                <Alert color="success" className="mb-4">
                                    <span className="font-medium">Success!</span> {success}
                                </Alert>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <Label
                                        htmlFor="name"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Celebrant's Name
                                    </Label>
                                    <TextInput
                                        id="name"
                                        type="text"
                                        placeholder="e.g. John Doe"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        className="bg-gray-50 dark:bg-[#000000] dark:text-gray-100 dark:border-[#222222]"
                                    />
                                </div>

                                <div>
                                    <Label
                                        htmlFor="image"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Upload an Image
                                    </Label>
                                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-[#222222] border-dashed rounded-lg">
                                        <div className="space-y-1 text-center">
                                            {previewUrl ? (
                                                <div className="relative group">
                                                    <img
                                                        src={previewUrl || "/placeholder.svg"}
                                                        alt="Preview"
                                                        className="mx-auto h-32 w-32 object-cover rounded-lg"
                                                    />
                                                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity">
                                                        <FiUpload className="h-6 w-6 text-white" />
                                                    </div>
                                                </div>
                                            ) : (
                                                <FiImage className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600" />
                                            )}
                                            <div className="flex text-sm text-gray-600 dark:text-gray-400">
                                                <label
                                                    htmlFor="image"
                                                    className="relative cursor-pointer rounded-md font-medium text-purple-600 dark:text-purple-400 hover:text-purple-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-purple-500"
                                                >
                                                    <span>
                                                        {previewUrl ? "Change image" : "Upload an image"}
                                                    </span>
                                                    <input
                                                        id="image"
                                                        name="image"
                                                        type="file"
                                                        accept="image/*"
                                                        className="sr-only"
                                                        onChange={handleImageChange}
                                                    />
                                                </label>
                                                {!previewUrl && (
                                                    <p className="pl-1">or drag and drop</p>
                                                )}
                                            </div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                PNG, JPG, GIF up to 10MB
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 text-white"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <div className="flex items-center justify-center">
                                            <Spinner size="sm" className="mr-3" />
                                            Creating...
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center">
                                            <FiGift className="mr-2" />
                                            Create Birthday Page
                                        </div>
                                    )}
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateBirthday;
