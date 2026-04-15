import { useNavigate } from "react-router-dom";
import CategoryFilter from "../components/CategoryFilter/CategoryFilter";
import productFilterSlices from "../components/ProductList/productFilterSlices";
import ProductList from "../components/ProductList/ProductList";
import productSlices from "../components/ProductList/productSlices";
import { productApi } from "../services/mockApi";
import {
    productsSelector,
    productsPageSelector,
    productsTotalPageSelector,
    productsCategorySelector,
    productsSearchQuerySelector,
} from "../store/selectors";
import { useAppDispatch, useAppSelector } from "../store/store";
import { CategoryValue } from "../types/Product";
import { isValidCategory } from "../utils/utils";
import "./HomePage.css";
import { useEffect } from "react";

const categories = [...Object.values(CategoryValue)];

interface HomePageProps {
    onAddToCart?: (productId: string) => void;
}

function HomePage({ onAddToCart }: HomePageProps) {
    const products = useAppSelector(productsSelector);
    const page = useAppSelector(productsPageSelector);
    const pages = useAppSelector(productsTotalPageSelector);
    const currentCategory = useAppSelector(productsCategorySelector);
    const searchQuery = useAppSelector(productsSearchQuerySelector);
    const hasNextPage = page !== null && pages !== null ? page < pages : false;
    const dispatch = useAppDispatch();
    const navigator = useNavigate();
    useEffect(() => {
        let isRunning = true;
        const fetchProducts = async () => {
            const response = searchQuery.trim()
                ? await productApi.searchProducts(searchQuery, page, 5)
                : await productApi.getProducts(page, currentCategory, 5);
            if (response.type === "success") {
                if (isRunning) {
                    dispatch(
                        productSlices.actions.addProducts({
                            items: response.data.items,
                            page: response.data.currentPage,
                            pages: response.data.totalPages,
                        }),
                    );
                }
            }
        };
        fetchProducts();
        return () => {
            isRunning = false;
        };
    }, [dispatch, page, currentCategory, searchQuery]);
    const isDisabledPreviousPage = page === null || page === 1;
    const isDisabledNextPage = !hasNextPage;
    const handleClickNextPage = () => {
        if (isDisabledNextPage) return;
        dispatch(productFilterSlices.actions.setPage(page! + 1));
    };

    const handleClickPreviousPage = () => {
        if (isDisabledPreviousPage) return;
        dispatch(productFilterSlices.actions.setPage(page! - 1));
    };

    const handleCategoryChange = (category: string) => {
        if (!isValidCategory(category)) return;
        dispatch(productFilterSlices.actions.setCategory(category));
    };
    const handleOnViewDetail = (productId: string) => {
        navigator("/product/" + productId);
    };
    return (
        <div className="home-page">
            <div className="home-page__container">
                <CategoryFilter
                    categories={categories}
                    activeCategory={currentCategory}
                    onCategoryChange={handleCategoryChange}
                />
                <main className="home-page__content">
                    <h1 className="home-page__title">
                        {searchQuery.trim()
                            ? `Search: "${searchQuery}"`
                            : `${currentCategory} Products`}
                    </h1>
                    <ProductList
                        products={products}
                        onAddToCart={onAddToCart}
                        onViewDetail={handleOnViewDetail}
                    />

                    <div className="home-page__pagination">
                        <button
                            className={`home-page__page-btn ${isDisabledPreviousPage ? "home-page__page-btn--disabled" : ""}`}
                            type="button"
                            disabled={isDisabledPreviousPage}
                            onClick={handleClickPreviousPage}
                        >
                            Previous
                        </button>
                        <span className="home-page__page-info">
                            {`Page ${page} of ${pages}`}
                        </span>
                        <button
                            className={`home-page__page-btn ${isDisabledNextPage ? "home-page__page-btn--disabled" : ""}`}
                            type="button"
                            disabled={isDisabledNextPage}
                            onClick={handleClickNextPage}
                        >
                            Next
                        </button>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default HomePage;
