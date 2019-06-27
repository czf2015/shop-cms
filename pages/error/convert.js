import { DateFormat } from '@/utils/Date.js'

export function convert(item, method = 'GET') {
    return method === 'GET' ?
        {
            // "_id": typeof item === 'undefined' ? '' : item._id,
            "openid": typeof item === 'undefined' ? '' : item.openid,
            "createDate": typeof item === 'undefined' ? '' : DateFormat.fullDate(new Date(item.createDate)),
            "body_version": typeof item === 'undefined' ? '' : item.body && item.body.version,
            "body_stack": typeof item === 'undefined' ? '' : item.body && item.body.stack,
            "body_message": typeof item === 'undefined' ? '' : item.body && JSON.stringify(item.body.message),
            "body_position": typeof item === 'undefined' ? '' : item.body && item.body.position || item.body.positioning,
            "body_code": typeof item === 'undefined' ? '' : item.body && item.body.code,
            // "session_cookie_path": typeof item === 'undefined' ? '' : item.session && item.session.cookie && item.session.cookie.path,
            // "session_cookie__expires": typeof item === 'undefined' ? '' : item.session && item.session.cookie && item.session.cookie._expires,
            // "session_cookie_originalMaxAge": typeof item === 'undefined' ? '' : item.session && item.session.cookie && item.session.cookie.originalMaxAge,
            // "session_cookie_httpOnly": typeof item === 'undefined' ? '' : item.session && item.session.cookie && item.session.cookie.httpOnly,
            // "session_cookie_expires": typeof item === 'undefined' ? '' : item.session && item.session.cookie && item.session.cookie.expires,
            // "session_cookie_maxAge": typeof item === 'undefined' ? '' : item.session && item.session.cookie && item.session.cookie.maxAge,
            // "session_data_originalMaxAge": typeof item === 'undefined' ? '' : item.session && item.session.data && item.session.data.originalMaxAge,
            // "session_data_expires": typeof item === 'undefined' ? '' : item.session && item.session.data && item.session.data.expires,
            // "session_data_secure": typeof item === 'undefined' ? '' : item.session && item.session.data && item.session.data.secure,
            // "session_data_httpOnly": typeof item === 'undefined' ? '' : item.session && item.session.data && item.session.data.httpOnly,
            // "session_data_domain": typeof item === 'undefined' ? '' : item.session && item.session.data && item.session.data.domain,
            // "session_data_path": typeof item === 'undefined' ? '' : item.session && item.session.data && item.session.data.path,
            // "session_data_sameSite": typeof item === 'undefined' ? '' : item.session && item.session.data && item.session.data.sameSite,
            "session_passport_user_session_key": typeof item === 'undefined' ? '' : item.session && item.session.passport && item.session.passport.user && item.session.passport.user.session_key,
            "session_passport_user_userId": typeof item === 'undefined' ? '' : item.session && item.session.passport && item.session.passport.user && item.session.passport.user.userId,
            "session_passport_user_openid": typeof item === 'undefined' ? '' : item.session && item.session.passport && item.session.passport.user && item.session.passport.user.openid,
            "session_passport_user_unionId": typeof item === 'undefined' ? '' : item.session && item.session.passport && item.session.passport.user && item.session.passport.user.unionId,
            "session_passport_user_nickName": typeof item === 'undefined' ? '' : item.session && item.session.passport && item.session.passport.user && item.session.passport.user.nickName,
            "session_passport_user_giftReferCode": typeof item === 'undefined' ? '' : item.session && item.session.passport && item.session.passport.user && item.session.passport.user.giftReferCode
        } : undefined
}
