import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from 'uuid';
import { CategoriesData } from "./CategoryPage";
import { db } from '../../Firebase/firebase';
import { set, ref, onValue, update } from 'firebase/database';
import { Loaders } from "../Config/images";
import Strings from "../Config/Strings";
import Input from "../ReusableComponent/Input";
import { useLanguageContext } from "../LanguageContext";

interface Props {
  onAddCategory: (newCategory: CategoriesData) => Promise<void>;
  id: string
  onClose: () => void;
}

const AddCategory: React.FC<Props> = ({ onAddCategory, id, onClose }) => {
  const { t } = useLanguageContext();

  const presetKey = "ml_default";
  const cloudName = "dwxhjomtn";
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
  const [isLoading, setisLoading] = useState(false)


  useEffect(() => {
    if (id) {
      fetchCategoryById(id);
    }
  }, [id]);

  const fetchCategoryById = async (id: string) => {
    setisLoading(true)
    const categoryRef = ref(db, `categories/${id}`);
    onValue(categoryRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setCategory(data as CategoriesData);
        setImagePreview(data.imageUrl || null);
      } else {
        toast.error("Error fetching category.");
      }
    }, {
      onlyOnce: true
    });
    setisLoading(false)
  };

  const handleUpdate = async (e: React.FormEvent) => {
    setisLoading(true)

    e.preventDefault();

    const newErrors: Partial<CategoriesData> = {};
    if (isFieldEmpty(category.categoryName)) newErrors.categoryName = "Category Name is required";
    if (isFieldEmpty(category.description)) newErrors.description = "Description is required";
    if (isFieldEmpty(category.numberOfProducts)) newErrors.numberOfProducts = "Number Of Products is required";
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
      const categoryRef = ref(db, `categories/${id}`);
      await update(categoryRef, updatedCategory);
      toast.success('Category successfully updated');
    } catch (error) {
      toast.error("Error updating category.");
    }
    setisLoading(false)
    onClose()
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setisLoading(true)

    e.preventDefault();
    const newErrors: Partial<CategoriesData> = {};

    if (isFieldEmpty(category.categoryName)) newErrors.categoryName = "Category Name is required";
    if (isFieldEmpty(category.description)) newErrors.description = "Description is required";
    if (isFieldEmpty(category.numberOfProducts)) newErrors.numberOfProducts = "Number Of Products is required";
    if (isFieldEmpty(category.status)) newErrors.status = "Status is required";

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
      const categoryRef = ref(db, `categories/${newCategory.id}`);
      await set(categoryRef, newCategory);
      toast.success("Category added successfully!");
      onAddCategory(newCategory);
    } catch (error) {
      toast.error("Error adding category.");
    }
    setisLoading(false)
    resetForm();
    onClose()
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const updatedCategory: any = { ...category }
    updatedCategory[name] = value

    setCategory(updatedCategory)
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
      imageUrl: ""
    });
    setImagePreview(null);
    setImageFile(null);
  };



  const uploadImageToCloudinary = async (file: File) => {
    setisLoading(true)
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", presetKey);
    formData.append("cloud_name", cloudName);
    formData.append("folder", "Categories")

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        return data.secure_url;
      } else {
        toast.error("Failed to upload image.");
        return "";
      }
    } catch (error) {
      toast.error("Error uploading image.");
      setisLoading(false)
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
            className="font-semibold" style={{ fontFamily: "Montserrat Alternates" }}
          >
            {t(Strings.addCategory.labelImage)}
          </span>

          <div className="">
            <div className="flex justify-center items-starts flex-col ">
              {imagePreview ? (
                <img src={imagePreview} alt="Selected" className="w-full h-64 object-cover rounded-lg" />
              ) : (
                <Input
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
            className="w-full flex flex-row font-semibold" style={{ fontFamily: "Montserrat Alternates" }}
          >
            {isLoading ? (
              <div className="flex justify-center items-center mt-20">
                <img src={Loaders} alt="" className="h-24 w-24" />
              </div>
            ) : (
              <div className="flex flex-wrap mb-6">
                <div className="w-full px-3 mb-6">
                  <label className="flex justify-self-start  uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    {t(Strings.addCategory.labelName)}
                  </label>
                  <Input
                    className={` appearance-none w-full h-[60px] text-[#A2A3A5] border border-[2px solid #E8E8E8]  py-3 px-4 leading-tight hover:outline-none hover:border-[#9ad219]    focus:outline-[#99c928] rounded-md bg-white`}
                    type="text"
                    placeholder="Pizza"
                    name="categoryName"
                    onChange={handleChange}
                    value={category.categoryName}
                  />
                  {errors.categoryName && (
                    <span
                      className={`text-red-600 text-sm ${category.categoryName ? "" : "hidden"
                        }}`}
                    >
                      {errors.categoryName}
                    </span>
                  )}
                </div>
                <div className="w-full md:w-1/1 px-3 mb-6">
                  <label className="flex justify-self-start  uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    {t(Strings.addCategory.labelDescription)}
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
                    {t(Strings.addCategory.labelNumberOfCategory)}
                  </label>
                  <Input
                    className={` appearance-none  block w-full h-[60px]  text-[#A2A3A5] border border-[2px solid #E8E8E8] rounded py-3 px-4 leading-tight hover:border-[#9ad219]    focus:outline-[#99c928] bg-white`}
                    id="grid-last-name"
                    type="number"
                    placeholder="180"
                    onChange={handleChange}
                    name="numberOfProducts"
                    value={category.numberOfProducts}
                  />
                  {errors.numberOfProducts && (
                    <span className="text-red-600 text-sm">{errors.numberOfProducts}</span>
                  )}
                </div>

                <div className="w-full md:w-1/2 px-3 mb-6">
                  <label className="flex justify-self-start  uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    {t(Strings.addCategory.labelStatus)}
                  </label>
                  <select
                    name="status"
                    value={category.status}
                    className="appearance-none block w-full h-[60px] text-[#A2A3A5] border border-[2px solid #E8E8E8] rounded py-3 px-4 leading-tight hover:border-[#9ad219]    focus:outline-[#99c928]    bg-white "
                    onChange={(e) => handleChange(e)}                >
                    <option className="" value="In Stock" >
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

              </div>)}
          </form>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          className="rounded-[60px] shadow-registerBtn ml-5 text-[#FFFFFF] bg-[#94CD00] h-[40px] w-[140px] "
          onClick={handleSubmit}
          style={{
            fontFamily: "Bai Jamjuree",
          }}
        >
          {t(Strings.addCategory.labelSaveButton)}
        </button>
        <ToastContainer
          position="top-right"
          autoClose={1000}
          pauseOnFocusLoss={false}
          limit={1}
        />
        <button
          type="submit"
          className={`rounded-[60px] ml-5 text-[#FFFFFF] shadow-registerBtn bg-[#94CD00] h-[40px] w-[140px] `}
          onClick={handleUpdate}
          style={{
            fontFamily: "Bai Jamjuree",
          }}
        >
          {t(Strings.addCategory.labelUpdateButton)}
        </button>
      </div>
      {/* DialogBox For Add Category */}
    </div>
  );
};

export default AddCategory;
