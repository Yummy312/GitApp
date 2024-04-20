export const usePagination = () => {
    const getPageCount = (data, limit) => {
        if (data) {
            return Math.ceil(data.length / limit);
        } else {
            return null;
        }
    };

    const getPagesArray = (totalPages) => {
        let res = [];
        for (let i = 0; i < totalPages; i++) {
            res.push(i + 1);
        }
        return res;
    };

    const getSlicePerPage = (data, itemsPerPage, currentPage) => {
        if (data){
            const indexOfLastItem = currentPage * itemsPerPage;
            const indexOfFirstItem = indexOfLastItem - itemsPerPage;
            const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
            return currentItems;
        }

    };

    return [
        getPagesArray,
        getPageCount,
        getSlicePerPage
    ]
};
