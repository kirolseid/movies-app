
class ApiFeatures {
    constructor(mongooseQuery, queryString) {
        this.mongooseQuery = mongooseQuery;
        this.queryString = queryString
    }
    paginate() {
        let page = this.queryString.page * 1 || 1;
        if (page < 1) page = 1
        let limit = 50;
        let skip = (page - 1) * limit;
        this.mongooseQuery.skip(skip).limit(limit)
        this.page=page
        return this;
    }

    filter() {
        if (this.queryString.filter) {
            let word = this.queryString.filter
            this.mongooseQuery.find({ Genre: { $regex: word, $options: 'i' }  })
        }
        return this;
    }


    search() {
        if (this.queryString.keyword) {
            let word = this.queryString.keyword
            this.mongooseQuery.find({ $or: [{ Title: { $regex: word, $options: 'i' } }, { Director: { $regex: word, $options: 'i' } }] })
        }
        return this;
    }
}
module.exports=ApiFeatures