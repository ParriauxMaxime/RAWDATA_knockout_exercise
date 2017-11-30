define(['jquery', 'lib/knockout'], function ($, ko) {
    function Post(Id, PostType, ParentId, CreationDate, Score, Body, Title) {
        this.Id = Id;
        this.PostType = PostType;
        this.ParentId = ParentId;;
        this.CreationDate = CreationDate;
        this.Score = Score;
        this.Body = Body;
        this.Title = Title;
    }

    let Posts = {
        posts: ko.observableArray([]),
        total: ko.observable(0),
        pages: ko.observable(0),
        prev: ko.observable(null),
        next: ko.observable(null),
        page: ko.observable(0),
        pageSize: ko.observable(10),
    }

    const Actions = {
        clickPrev: () => {
            const prev = Posts.prev();
            const page = prev.replace(/.*page=([0-9]+).*/, "$1");
            getPosts(page)
        },
        clickNext: () => {
            const next = Posts.next();
            const page = next.replace(/.*page=([0-9]+).*/, "$1");
            getPosts(page)
        }
    }

    $("#PageSize").on('change', (e) => {
        e.preventDefault;
        Posts.pageSize(e.target.value)
        getPosts();
    })

    function updatePosts(page, pageSize, response) {
        Posts.posts(response.items)
        Posts.total(response.total)
        Posts.pages(response.pages - 1)
        Posts.prev(response.prev)
        Posts.next(response.next)
        Posts.page(page)
        Posts.pageSize(pageSize)
        return Posts;
    }


    function getPosts(page = Posts.page(), pageSize = Posts.pageSize()) {
        fetch("http://localhost:64167/api/posts?page=" + page + "&pageSize=" + pageSize, {
                method: "GET"
            })
            .then(response => response.json())
            .then(response => {
                updatePosts(page, pageSize, response)
            })
            .catch(error => console.error(error))
    }


    getPosts();
    const AppViewModel = {
        ...Actions,
        ...Posts
    }
    return {
        Posts,
        getPosts,
        AppViewModel,
    }
})