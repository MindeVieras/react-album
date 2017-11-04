export const selectPage = (page) => {
    console.log("You clicked on page: ", page.title);
    return {
        type: 'PAGE_SELECTED',
        payload: page
    }
};
