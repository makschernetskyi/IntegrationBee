
export default {
    props: ["header","content"],
    setup(props){
        return {content: props.content, header: props.header}
    },
    template: `
        <article class="NewsPage-Feed-Item">
            <h2>{{header}}</h2>
            <p v-html="content"></p>
        </article>
    `
}