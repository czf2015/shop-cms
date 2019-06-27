export const columns = [
    // {
    //     title: "_id",
    //     dataIndex: "_id",
    //     scopedSlots: { customRender: "_id" }
    // },
    {
        title: "openid",
        dataIndex: "openid",
        width: 400,
    },
    {
        title: "createDate",
        dataIndex: "createDate",
        width: 400,
    },
    {
        title: "body",
        children: [
            {
                title: "version",
                dataIndex: "body_version",
                width: 400,
            },
            {
                title: "stack",
                dataIndex: "body_stack",
                width: 400,
            },
            {
                title: "message",
                dataIndex: "body_message",
                width: 400,
            },
            {
                title: "position",
                dataIndex: "body_position",
                width: 400,
            },
            {
                title: "code",
                dataIndex: "body_code",
                width: 400,
            },
        ]
    },
    {
        title: "session",
        children: [
            // {
            //         title: "cookie",
            //         children: [
            //             {
            //                 title: "path",
            //                 dataIndex: "session_cookie_path",
            //                 width: 400,
            //                 scopedSlots: { customRender: "session_cookie_path" },
            //             },
            //             {
            //                 title: "_expires",
            //                 dataIndex: "session_cookie__expires",
            //                 width: 400,
            //                 scopedSlots: { customRender: "session_cookie__expires" },
            //                 sorter: true
            //             },
            //             {
            //                 title: "originalMaxAge",
            //                 dataIndex: "session_cookie_originalMaxAge",
            //                 width: 400,
            //                 scopedSlots: { customRender: "session_cookie_originalMaxAge" }
            //             },
            //             {
            //                 title: "httpOnly",
            //                 dataIndex: "session_cookie_httpOnly",
            //                 width: 400,
            //                 scopedSlots: { customRender: "session_cookie_httpOnly" },
            //             },
            //             {
            //                 title: "expires",
            //                 dataIndex: "session_cookie_expires",
            //                 width: 400,
            //                 scopedSlots: { customRender: "session_cookie_expires" },
            //                 sorter: true
            //             },
            //             {
            //                 title: "maxAge",
            //                 dataIndex: "maxAge",
            //                 width: 400,
            //                 scopedSlots: { customRender: "session_cookie_maxAge" }
            //             },
            //             {
            //                 title: "expires",
            //                 dataIndex: "session_cookie_expires",
            //                 width: 400,
            //                 scopedSlots: { customRender: "session_cookie_expires" },
            //                 sorter: true
            //             },
            //         ]
            //     },
            //     {
            //         title: "data",
            //         children: [
            //             {
            //                 title: "originalMaxAge",
            //                 dataIndex: "session_data_originalMaxAge",
            //                 width: 400,
            //                 scopedSlots: { customRender: "session_data_originalMaxAge" },
            //             },
            //             {
            //                 title: "expires",
            //                 dataIndex: "session_data_expires",
            //                 width: 400,
            //                 scopedSlots: { customRender: "session_data_expires" },
            //                 sorter: true
            //             },
            //             {
            //                 title: "secure",
            //                 dataIndex: "session_data_secure",
            //                 width: 400,
            //                 scopedSlots: { customRender: "session_data_secure" },
            //             },
            //             {
            //                 title: "httpOnly",
            //                 dataIndex: "session_data_httpOnly",
            //                 width: 400,
            //                 scopedSlots: { customRender: "session_data_httpOnly" },
            //                 sorter: true
            //             },
            //             {
            //                 title: "domain",
            //                 dataIndex: "session_data_domain",
            //                 width: 400,
            //                 scopedSlots: { customRender: "session_data_domain" },
            //             },
            //             {
            //                 title: "path",
            //                 dataIndex: "session_data_path",
            //                 width: 400,
            //                 scopedSlots: { customRender: "session_data_path" },
            //                 sorter: true
            //             },
            //             {
            //                 title: "sameSite",
            //                 dataIndex: "session_data_sameSite",
            //                 width: 400,
            //                 scopedSlots: { customRender: "session_data_sameSite" },
            //             },]
            //     },
            {
                title: "passport",
                children: [{
                    title: "user",
                    children: [
                        {
                            title: "session_key",
                            dataIndex: "session_passport_user_session_key",
                            width: 400,
                        },
                        {
                            title: "userId",
                            dataIndex: "session_passport_user_userId",
                            width: 400,
                        },
                        {
                            title: "openid",
                            dataIndex: "session_passport_user_openid",
                            width: 400,
                        },
                        {
                            title: "unionId",
                            dataIndex: "session_passport_user_unionId",
                            width: 400,
                        },
                        {
                            title: "nickName",
                            dataIndex: "session_passport_user_nickName",
                            width: 400,
                        },
                        {
                            title: "giftReferCode",
                            dataIndex: "session_passport_user_giftReferCode",
                            width: 400,
                        }
                    ]
                }]
            }
        ]
    }]
