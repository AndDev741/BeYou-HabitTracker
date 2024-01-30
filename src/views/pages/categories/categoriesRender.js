import AddEditCategory from "./addEditCategory";
import CategoriesList from "./categoriesList";
import ReturnButton from "../components/returnButton";

export default function CategoriesRender(){
    return(
        <div className="mb-4">
            <ReturnButton/>
            <div className="flex justify-between">
                <div>
                    <CategoriesList/>
                </div>
                <div>
                    <AddEditCategory/>
                </div>
            </div>
        </div>
        
    )
}