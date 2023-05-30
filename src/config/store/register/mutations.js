export function setUser (state, payload)
{
    state.user = payload
}
export function setUserId(state, payload)
{
    state.account['user_id'] = payload
}
export function setAccount(state, payload)
{

    state.account['name'] = payload.name
    state.account['person'] = payload.person
    state.account['telephone'] = payload.telephone
    state.account['phone'] = payload.phone
    state.account['genre'] = payload.genre != '' ? payload.genre.charAt(0) :''
    state.account['birthday'] = birthGetter(payload.birthday)
    state.account['notifications'] = payload.notifications != '' ? payload.notifications.charAt(0) :''
    state.account['apartment_id'] = payload.apartment_id
    // state.account['invitation_id'] = payload.invitation_id
}
export function setInvite(state, payload)
{
    state.invite['name'] = payload.name
    state.invite['email'] = payload.email
    state.invite['invitation_id'] = payload.id
    state.account['invitation_id'] = payload.id
    state.invite['create_avatar'] = payload.create_avatar
    state.invite['data'] = JSON.parse(payload.data)
}
export function setUpdateData(state, payload)
{
    state.invite.data['phone'] = payload.phone
    state.invite.data['telephone'] = payload.telephone
    state.invite.data['genre'] = payload.genre
    state.invite.data['notifications'] = payload.notifications
}


function birthGetter (value)
{
    if(value !=  ''){

        if(!value.includes('-')){
            let editBirthday = value.substring(0,2)+'/'+value.substring(4,2)+'/'+value.substring(4,8)
            return formatData(editBirthday)
        }

        return value
    }

    return ''
}
function formatData(dateA){
    let parDate = dateA.split('/')
    var day = parDate[0]
    var month = parDate[1]
    var year = parDate[2]

    var formatWorld = year+ '-'+ month+ '-'+day

    return formatWorld

}

