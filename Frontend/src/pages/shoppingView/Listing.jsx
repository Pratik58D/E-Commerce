import ProductFilter from "@/components/shoppingView/ShoppingFilter";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { sortOptions } from "@/config";
import { ArrowUpDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductDetails,
  getShopProduct,
} from "@/store/shop/shopProduct.slice";
import ShopProductTile from "./ShopProductTile";
import { useSearchParams } from "react-router-dom";
import ProductDetailsDialog from "@/components/shoppingView/ProductDetails";
import { addToCart, fetchCardItems } from "@/store/shop/cart.slice";
import { toast } from "react-toastify";

function createSearchParamsHelper(filterParams) {
  const queryParams = [];
  //It loops through the object and checks if the value is an array.
  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramsValue = value.join(",");
      queryParams.push(`${key}=${encodeURIComponent(paramsValue)}`);
    }
  }

  return queryParams.join("&");
}

const Listing = () => {
  const dispatch = useDispatch();
  const { productList,  productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const { user } = useSelector((state) => state.auth);
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  

  //sorting function
  function handleSorting(value) {
    setSort(value);
  }
  //getsection id consist brand or category where getCurentOption constans men , nike etc
  function handleFilter(getSectionId, getCurrentOption) {
    // console.log(getSectionId , getCurrentOption)
    let copyFilters = { ...filters };
    const indexOfCurrentSection =
      Object.keys(copyFilters).indexOf(getSectionId);
    if (indexOfCurrentSection === -1) {
      copyFilters = {
        ...copyFilters,
        [getSectionId]: [getCurrentOption],
      };
    } else {
      const indexOfCurrentOption =
        copyFilters[getSectionId].indexOf(getCurrentOption);
      if (indexOfCurrentOption === -1) {
        copyFilters[getSectionId].push(getCurrentOption);
      } else {
        copyFilters[getSectionId].splice(indexOfCurrentOption, 1);
      }
    }
    setFilters(copyFilters);
    sessionStorage.setItem("filters", JSON.stringify(copyFilters));
  }
  // console.log("filters",filters);

  function handleGetProductDetails(getCurrentProductId) {
    // console.log(getCurrentProductId)
    dispatch(getProductDetails(getCurrentProductId));
  }
  // console.log(productDetails)

  function handleAddtoCart(getCurrentProductId) {
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) =>{ 
      if(data?.payload?.success){
      dispatch(fetchCardItems(user?.id));
      toast.success("Product added to the Cart")
    };
      }
    )
  }
 



  useEffect(() => {
    setSort("price-low-high");
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, []);

  //when filters updates useEfect executed
  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const createQueryString = createSearchParamsHelper(filters);
      setSearchParams(new URLSearchParams(createQueryString));
    }
  }, [filters]);
  // console.log(filters,searchParams)

  //fetching products here
  useEffect(() => {
    if (filters !== null && sort !== null)
      dispatch(getShopProduct({ filterParams: filters, sortParams: sort }));
  }, [dispatch, sort, filters]);

  useEffect(() => {
    if (productDetails !== null) {
      setOpenDetailsDialog(true);
    }
  }, [productDetails]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-4">
      <ProductFilter filters={filters} handleFilter={handleFilter} />
      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-bold">All Products</h2>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground ">
              {productList?.length} Products{" "}
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ArrowUpDownIcon className="h-4 w-4" />
                  <span>Sorted By</span>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup
                  value={sort}
                  onValueChange={handleSorting}
                >
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem
                      value={sortItem.id}
                      key={sortItem.id}
                    >
                      <span> {sortItem.label}</span>
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {productList
            ? productList.map((productItem, index) => (
                <ShopProductTile
                  product={productItem}
                  key={index}
                  handleGetProductDetails={handleGetProductDetails}
                  handleAddtoCart={handleAddtoCart}
                />
              ))
            : null}
        </div>
      </div>
      <ProductDetailsDialog
        productDetails={productDetails}
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
      />
    </div>
  );
};

export default Listing;
