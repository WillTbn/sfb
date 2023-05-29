// import axios from "axios";
export function setPersonalData (context, data)
{
    context.commit('setAccount', data)
}
export function invite(context, data)
{
    context.commit('setInvite', data)
}
