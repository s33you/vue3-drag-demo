export const componentList: Array<BaseComponent> = [
    {
        type: 'c-button',
        style: {
            color: "red",
            fontSize: 19,
            lineHeight: 40,
            borderRadius: 10,
            textAlign: "center",
        },
        layout: {
            width: 100,
            height: 100,
            top: 30,
            left: 10,
            rotate: 0
        },
        label: '按钮',
        icon: 'thumb',
        props: {
            text: '按钮文字'
        }
    },
    {
        type: 'c-img',
        style: {
            color: "red",
            fontSize: 19,
            lineHeight: 40,
            borderRadius: 10,
            textAlign: "center",
        },
        layout: {
            width: 100,
            height: 100,
            top: 30,
            left: 10,
            rotate: 0
        },
        label: '图文',
        icon: 'picture',
        props: {
            text: '文本文字',
            img: ''
        }
    }
]