

export class ApiFeatures{
    constructor(mongooseQuery , queryString){
        this.mongooseQuery = mongooseQuery;
        this.queryString = queryString;
    }

    paginate(total){
        let page = this.queryString.page;
        this.page = page * 1 || 1;
        if(page <= 0 || !page || page > total)  page = 1;
        let skip = (page - 1) * 10;
        this.mongooseQuery.skip(skip).limit(10);
        this.page = +page;
        return this;
    }

    fields(){
        if(this.queryString.fields){
            let fields = this.queryString.fields.split(',').join(' ');
            this.mongooseQuery.select(fields)
        }
        return this;
    }
    filter(){
        let filterObj = {...this.queryString};
        let excludedQuery = ['page' , 'sort' , 'fields'];
        excludedQuery.forEach((query)=>{
            delete filterObj[query];
        });
        console.log(filterObj);
        this.mongooseQuery.find(filterObj);
        return this;
    }
    sort(){
        if(this.queryString.sort){
            let sortedBy = this.queryString.sort.split(',').join(' ');
            this.mongooseQuery.sort(sortedBy);
        }
        return this
    }
}
