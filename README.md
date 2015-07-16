# Go pushState

Trying out a partials + pushState approach in Go.

### Usage

It's just an example implementation, not a framework. To run it, just clone the repo, and run `$ go build && ./go-pushstate`

### Backend

At the endpoint `"/"`, go will serve the HTML, CSS, and JS. At any other endpoint, it will **only** send the matching template.

### Frontend

Any click to an anchor element is intercepted. The interception is done using event bubbling, so if more anchors are added dynamically to the DOM, then clicks to those will also be intercepted.

### License

MIT