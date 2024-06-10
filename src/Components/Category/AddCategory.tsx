import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { CategoriesData } from "./Home";

interface Props {
  onAddCategory: (newCategory: CategoriesData) => Promise<void>;
  id: string;
}

const AddCategory: React.FC<Props> = ({ onAddCategory, id }) => {
  const presetKey = "ml_default";
  const cloudName = "dwxhjomtn";
  const apiUrl = "http://localhost:5000/categories";

  const [category, setCategory] = useState<CategoriesData>({
    id: "",
    categoryName: "",
    description: "",
    numberOfProducts: "",
    status: "In Stock",
    imageUrl: "",
  });

  const [errors, setErrors] = useState<Partial<CategoriesData>>({});
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchCategoryById(id);
    }
  }, [id]);

  const fetchCategoryById = async (id: string) => {
    try {
      const response = await fetch(`${apiUrl}/${id}`);
      if (response.ok) {
        const data = await response.json();
        setCategory(data);
        setImagePreview(data.imageUrl || null);
      } else {
        toast.error("Failed to fetch category.");
      }
    } catch (error) {
      toast.error("Error fetching category.");
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Partial<CategoriesData> = {};
    if (isFieldEmpty(category.categoryName))
      newErrors.categoryName = "Category Name is required";
    if (isFieldEmpty(category.description))
      newErrors.description = "Description is required";
    if (isFieldEmpty(category.numberOfProducts))
      newErrors.numberOfProducts = "Number Of Products is required";
    if (isFieldEmpty(category.status)) newErrors.status = "Status is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});

    let imageUrl = category.imageUrl;
    if (imageFile) {
      imageUrl = await uploadImageToCloudinary(imageFile);
    }

    const updatedCategory = { ...category, imageUrl };

    try {
      const response = await fetch(`http://localhost:5000/categories/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCategory),
      });

      if (response.status === 200) {
        // @ts-ignore
        const data = await response.json();
        toast.success("Category successfully updated");
      } else {
        toast.warn("Failed to update!");
      }
    } catch (error) {
      toast.error("Error updating category.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Partial<CategoriesData> = {};

    switch (true) {
      case isFieldEmpty(category.categoryName):
        newErrors.categoryName = "Category Name is required";
        break;
      case isFieldEmpty(category.description):
        newErrors.description = "Description is required";
        break;
      case isFieldEmpty(category.numberOfProducts):
        newErrors.numberOfProducts = "Number Of Products is required";
        break;
      case isFieldEmpty(category.status):
        newErrors.status = "Status is required";
        break;
      default:
        break;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});

    let imageUrl = "";
    if (imageFile) {
      imageUrl = await uploadImageToCloudinary(imageFile);
    }

    const newCategory: CategoriesData = {
      ...category,
      imageUrl,
      id: uuidv4(),
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCategory),
      });

      if (response.ok) {
        toast.success("Category added successfully!");
        onAddCategory(newCategory);
      } else {
        toast.error("Failed to add category.");
      }
    } catch (error) {
      toast.error("Error adding category.");
    }

    resetForm();
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    const updatedCategory: any = { ...category };
    updatedCategory[name] = value;

    setCategory(updatedCategory);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const isFieldEmpty = (value: string | number) => {
    return value === "" || value === null || value === undefined;
  };

  const resetForm = () => {
    setCategory({
      categoryName: "",
      description: "",
      numberOfProducts: "",
      status: "In Stock",
      id: "",
      imageUrl: "",
    });
    setImagePreview(null);
    setImageFile(null);
  };

  const uploadImageToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", presetKey);
    formData.append("cloud_name", cloudName);
    formData.append("folder", "Categories");

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        return data.secure_url;
      } else {
        toast.error("Failed to upload image.");
        return "";
      }
    } catch (error) {
      toast.error("Error uploading image.");
      return "";
    }
  };

  return (
    <div className="">
      {/* DialogBox For Add Category */}

      <div
        className={`flex justify-center gap-2  mt-[250px] sm:mt-[200px] md:mt-[20px] lg:mt-[20px]  xl:mt-[5px]  lg:flex-nowrap flex-wrap`}
      >
        {/* image */}
        <div
          className={`flex flex-col items-center relative mt-[2px] sm:mt-[60px] md:mt-[10px] lg:mt-[10px] `}
        >
          <span
            className="font-semibold"
            style={{ fontFamily: "Montserrat Alternates" }}
          >
            Category Image
          </span>

          <div className="">
            <div className="flex justify-center items-starts flex-col ">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Selected"
                  className="w-full h-64 object-cover rounded-lg"
                />
              ) : (
                <input
                  type="file"
                  accept="image/*"
                  className="border-2 text-[#A2A3A5] mt-2 p-2 text-xl focus:outline-none rounded-lg w-full"
                  onChange={handleImageChange}
                />
              )}
            </div>
          </div>
        </div>
        <div className="w-full max-w-lg">
          <form
            className="w-full flex flex-row font-semibold "
            style={{ fontFamily: "Montserrat Alternates" }}
          >
            <div className="flex flex-wrap mb-6">
              <div className="w-full px-3 mb-6">
                <label className="flex justify-self-start  uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Category Name
                </label>
                <input
                  className={` appearance-none w-full h-[60px] text-[#A2A3A5] border border-[2px solid #E8E8E8] ro unded py-3 px-4 leading-tight hover:outline-none hover:border-[#9ad219]    focus:outline-[#99c928] rounded-md bg-white`}
                  type="text"
                  placeholder="Pizza"
                  name="categoryName"
                  onChange={handleChange}
                  value={category.categoryName}
                />
                {errors.categoryName && (
                  <span
                    className={`text-red-600 text-sm ${
                      category.categoryName ? "" : "hidden"
                    }}`}
                  >
                    {errors.categoryName}
                  </span>
                )}
              </div>
              <div className="w-full md:w-1/1 px-3 mb-6">
                <label className="flex justify-self-start  uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Discription
                </label>
                <textarea
                  className="appearance-none block w-full  text-[#A2A3A5] border border-[2px solid #E8E8E8] rounded py-3 px-4 leading-tight hover:border-[#9ad219]    focus:outline-[#99c928] bg-white resize-none"
                  //@ts-ignore
                  type="text"
                  id="grid-last-name"
                  placeholder="Type Here..."
                  rows={5}
                  cols={5}
                  name="description"
                  value={category.description}
                  onChange={handleChange}
                />
                {errors.description && (
                  <span className="text-red-600 text-sm">
                    {errors.description}
                  </span>
                )}
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6">
                <label className="flex justify-self-start  uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Number of Categories
                </label>
                <input
                  className={` appearance-none  block w-full h-[60px]  text-[#A2A3A5] border border-[2px solid #E8E8E8] rounded py-3 px-4 leading-tight hover:border-[#9ad219]    focus:outline-[#99c928] bg-white`}
                  id="grid-last-name"
                  type="number"
                  placeholder="180"
                  onChange={handleChange}
                  name="numberOfProducts"
                  value={category.numberOfProducts}
                />
                {errors.numberOfProducts && (
                  <span className="text-red-600 text-sm">
                    {errors.numberOfProducts}
                  </span>
                )}
              </div>

              <div className="w-full md:w-1/2 px-3 mb-6">
                <label className="flex justify-self-start  uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Status
                </label>
                <select
                  name="status"
                  value={category.status}
                  className="appearance-none block w-full h-[60px] text-[#A2A3A5] border border-[2px solid #E8E8E8] rounded py-3 px-4 leading-tight hover:border-[#9ad219]    focus:outline-[#99c928]    bg-white "
                  onChange={(e) => handleChange(e)}
                >
                  <option className="" value="In Stock">
                    In Stock
                  </option>
                  <option className="" value="Out of Stock">
                    Out of Stock
                  </option>
                </select>
              </div>
              {errors.status && (
                <span className="text-red-600 text-sm">{errors.status}</span>
              )}
            </div>
          </form>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          className="rounded-[60px] ml-5 text-[#FFFFFF] bg-[#94CD00] h-[40px] w-[140px]"
          style={{
            boxShadow: "2px 2px 25px 2px #94CD0099",
            fontFamily: "Bai Jamjuree",
          }}
          onClick={handleSubmit}
        >
          Save Category
        </button>
        <ToastContainer
          position="top-right"
          autoClose={1000}
          pauseOnFocusLoss={false}
          limit={1}
        />
        <button
          type="submit"
          className={`rounded-[60px] ml-5 text-[#FFFFFF] bg-[#94CD00] h-[40px] w-[140px] `}
          style={{
            boxShadow: "2px 2px 25px 2px #94CD0099",
            fontFamily: "Bai Jamjuree",
          }}
          onClick={handleUpdate}
        >
          Update Category
        </button>
      </div>
      {/* DialogBox For Add Category */}
    </div>
  );
};

export default AddCategory;
