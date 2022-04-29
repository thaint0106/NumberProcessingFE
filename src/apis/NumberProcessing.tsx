import axios from "../axios"
export interface INumberProcess {
    input: string
}
export const numberProcessing = (data: INumberProcess) => {
  return  axios.post("numberprocess",data)
}