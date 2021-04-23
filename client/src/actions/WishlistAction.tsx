import { Dispatch } from "react";
import { supabase } from "../SupaBase/conection";
import { message } from "antd";


export const GET_WISHLIST: string = "GET_WISHLIST";
export const POST_WISHLIST: string = "POST_WISHLIST"


const errorMsg = (err: string, time: number=3) => {
  message.error(err, time)
};


export const getWishlist = (id:any) => {
    console.log(id)
  return async (dispatch: Dispatch<any>) => {
    
          const{data:wishlist,error} = await supabase
                  .from('wishlist')
                  .select('*')
                  .eq('user_id',id)
          if (!error) {
              
              dispatch(saveWishlist(wishlist))
          } 
  }
}

const saveWishlist = (payload:any) =>({
  type:GET_WISHLIST,
  payload:payload
})


export const addWishlist = (category_name:string, category_image:any, category_id?: number, userId?: number, ) => {
  return async(dispatch: Dispatch<any>)=>{
      try{
          const {data,error} = await supabase.from('wishlist').insert([
              {
                  category_name:category_name,
                  category_image:category_image,
                  category_id: category_id,
                  user_id: userId,
              }
          ]);console.log(data)
          if (!error) {
              dispatch(handleWishlist(data));
          } else {
              errorMsg(JSON.stringify(error))
          }
      } catch (err){
          errorMsg('Internal server error. try again')
      }
  }
}

const handleWishlist= (data:any)=>({
  type:POST_WISHLIST,
  payload: data
})

 