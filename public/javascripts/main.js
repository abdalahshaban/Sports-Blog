$(() => {
    $('.category-delete').on('click', (e) => {
        id = $(e.target).attr('data-id');

        $.ajax({
            type: "Delete",
            url: "/categories/delete/" + id,
            success: (response) => {
                alert('deleteting record');
                window.location.href = '/manage/categories'
            },
            error: (error) => {
                console.log(error);

            }
        });
    });

    $('.article-delete').on('click', (e) => {
        id = $(e.target).attr('data-id');
        console.log(id)

        $.ajax({
            type: "Delete",
            url: "/articles/delete/" + id,
            success: (response) => {
                alert('deleteting record');
                window.location.href = '/manage/articles'
            },
            error: (error) => {
                console.log(error);

            }
        });
    });


})