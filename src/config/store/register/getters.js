export function birthGetter (state)
{
    if(state.account.birthday !=  ''){
        let birthday = state.account.birthday
        if(!birthday.includes('-')){
            let editBirthday = birthday.substring(0,2)+'/'+birthday.substring(4,2)+'/'+birthday.substring(4,8)
            return formatData(editBirthday)
        }

        return birthday
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
