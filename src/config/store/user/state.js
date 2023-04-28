
import { localId } from "@/config/global"
export default function () {
    return {
        user:[],
        account:!localStorage.getItem(`${localId}account`) ? [] : JSON.parse(localStorage.getItem(`${localId}account`)),
        auth:false
    }
}
