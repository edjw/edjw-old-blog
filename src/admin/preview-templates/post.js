import htm from "https://unpkg.com/htm?module";
import format from "https://unpkg.com/date-fns@2.13.0/esm/format/index.js?module";

const html = htm.bind(h);

// Preview component for a Post
const Post = createClass({
  render() {
    const entry = this.props.entry;
    return html`
      <main>
        <article class="prose">
          <h2>${entry.getIn(["data", "title"], null)}</h2>
          <p>

              Published: <time
                >${format(
      entry.getIn(["data", "date"], new Date()),
      "dd MMMM yyyy"
    )}</time
              >
          </p>

          <!--<p>${entry.getIn(["data", "summary"], "")}</p>-->

              <p>Tagged as:
            ${entry
        .getIn(["data", "tags"], [])
        .map((tag) => html` <a href="#" rel="tag">${tag}</a> `)}
          </p>

          ${this.props.widgetFor("body")}

        </article>
      </main>
    `;
  },
});

export default Post;
