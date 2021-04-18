import { type } from 'node:os'
import {supabase} from '../../SupaBase/conection'

export const BYPAXID:string="GET_BY_PAXID"
export const BYBOOKINGID:string="GET_BY_BOOKINGID"
export const BYFIRSTNAME:string="GET_BY_FIRSTNAME"
export const BYLASTNAME:string="GET_BY_LASTNAME"

const reg_ex=/[a-z]+/gi


export function getByPaxID(id: any){
    if(id.length===0){
        return async (dispatch:any)=>{
            dispatch(get_bookingPax([]))
        }
    }else{
        return async (dispatch:any)=>{
            const relacional:any=await supabase
            .from("booking_pax")
            .select(`*, pax_id(*), booking_id(*,room_id(*))`)
            .eq(`pax_id`, `${id}`)
            dispatch(get_bookingPax(relacional.data))
            console.log(relacional)
        }
    }
}
    



export function getByBookingID(id: any){
    if(id.length===0){
        return async (dispatch:any)=>{
            dispatch(get_bookingID([]))
        }
    }else{
    return async (dispatch:any)=>{
        const relacional:any=await supabase
        .from("booking_pax")
        .select(`*, booking_id(*,room_id(*)), pax_id(*)`)
        .eq('booking_id', `${id}`)
        console.log(relacional)
        dispatch(get_bookingID(relacional.data))
    }
    }
}
    


const get_bookingPax=(payload:any)=>{
    return{
        type:BYPAXID,
        payload
    }
    
}
const get_bookingID=(payload:any)=>{
    return{
        type:BYBOOKINGID,
        payload
    }
    
}

export function getFirstName(firstname: string) {
    if(firstname.length===0){
        return async (dispatch:any)=>{
            dispatch(getByFirstName([]))
        }
        }else{
        return async (dispatch:any)=>{
            const pax:any=await supabase
            .from("paxes")
            .select(`*`)
            .ilike('first_name', `%${firstname}%`) 
            const bookForName=pax.data.map((e:any)=>{
                return supabase
                .from("booking_pax")
                .select('*,booking_id(*,room_id(*)), pax_id(*)')
                .eq('pax_id',`${e.id}`)
                })
                const concatenadosporH:any[]=[]
                Promise.all(bookForName).then(res=>res.forEach((e:any)=>concatenadosporH.push(e.data)))
                .then(()=>dispatch(getByFirstName(concatenadosporH.flat())))
                    }
                    
    }
}


export function getLastName(lastname: string) {
    if(lastname.length===0){
        return async (dispatch:any)=>{
            dispatch(getByFirstName([]))
        }
    }else{
    return async (dispatch:any)=>{
        const pax:any=await supabase
        .from("paxes")
        .select(`*`)
        .ilike('last_name', `%${lastname}%`)
        const bookForLastName=pax.data.map((e:any)=>{
            return supabase
            .from("booking_pax")
            .select('*,booking_id(*,room_id(*)), pax_id(*)')
            .eq('pax_id',`${e.id}`)
            })
            const concatenadosporH:any[]=[]
            Promise.all(bookForLastName).then(res=>res.forEach((e:any)=>concatenadosporH.push(e.data)))
            .then(()=>dispatch(getByLastName(concatenadosporH.flat())))
                }
            }
        }  


const getByFirstName = (payload: any) => {
    return {
        type: BYFIRSTNAME,
        payload
    }
}
const getByLastName = (payload: any) => {
    return {
        type: BYLASTNAME,
        payload
    }
}