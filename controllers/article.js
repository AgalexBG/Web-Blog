const Article = require('mongoose').model('Article');

module.exports = {
    createGet: (req, res) => {
        res.render('article/create');
    },


    createPost: (req, res) => {
        let articleArgs = req.body;
        let errorMsg = "";

        if(!req.isAuthenticated()){
            errorMsg = "You should log in first";
        }else if(!articleArgs.title){
            errorMsg = "Invalid Title";
            }else if(!articleArgs.content){
            errorMsg = "Invalid Content";
        }

        if(errorMsg){
            res.render('article/create',{error:errorMsg});
            return;
        }
        articleArgs.author = req.user.id;
        Article.create(articleArgs).then(article => {
            req.user.articles.push(article.id);
                    res.redirect('/');
        })
    },
    details: (req, res) => {
        let id = req.params.id;

        Article.findById(id).populate('author').then(article => {
            res.render('article/details',article)
        });
    }
};

