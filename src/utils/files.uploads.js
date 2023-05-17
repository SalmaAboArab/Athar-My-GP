import multer from "multer";
import {AppError} from '../utils/response.error.js'

const Upload = ()=>{
  const storage = multer.diskStorage({});
  function fileFilter(req , file , cb){
    if(file.mimetype.startsWith('image')){
      cb(null , true)
    }else{
      cb(new AppError('image Only' , 400) , false)
    }
  }
  return multer({ storage , fileFilter});
}
export const SingleFile = (fieldName ) => {
 
  return Upload().single(fieldName)
};

export const MultiFile = (arrayOfFields ) => {
 
  return Upload().fields(arrayOfFields)
};