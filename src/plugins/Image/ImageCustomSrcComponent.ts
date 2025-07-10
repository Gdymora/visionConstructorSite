export const ImageCustomSrcComponent = (editor, commonTraits) => {
    editor.DomComponents.addType("image-component", {
        model: {
            defaults: {
                testprop: "12345",
                url: "https://jsonplaceholder.typicode.com/posts/1",
                traits: [
                    ...commonTraits,
                ],
                tagName: "img", 
                type: "imageCustomSrc",
                stylable: true, // Дозволяє редагування стилів
                classes: [],
            },
            init() {
                console.log("Local hook: model.init", this.attributes.testprop);
                fetch(this.attributes.url)
                    .then((response) => response.json())
                    .then((commits) => {
                        this.set("testprop", "TestImage");
                        console.log(this.attributes.testprop);
                    });
                this.listenTo(this, "change:testprop", this.handlePropChange);
                // Here we can listen global hooks with editor.on('...')
            },
            updated(property, value, prevValue) {
                console.log("Local hook: model.updated", "property", property, "value", value, "prevValue", prevValue);
            },
            removed() {
                console.log("Local hook: model.removed");
            },
            handlePropChange() {
                let prop = this.get("testprop");
                // Here inside view it is getting the old value. of "testprop" i.e '12345' but not
                //the new value
                //which is being fetched from server in the init() of model.
                let comp1 =
                    "<div>" +
                    '<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png" />' +
                    '<span title="foo">' +
                    prop +
                    "</span>" +
                    "</div>";

                const component = editor.addComponents(comp1);
                return component;
            },
        },
        view: {
            init() {
                console.log("Local hook: view.init");
            },
        },
    });

    editor.BlockManager.add("image-src-component", {
        label: "image-src-component",
        category: "Image",
        content: [{ type: "image-component" }] as any,
        media: `<svg viewBox="0 0 24 24">
        <path fill="currentColor" d="M21,3H3C2,3 1,4 1,5V19A2,2 0 0,0 3,21H21C22,21 23,20 23,19V5C23,4 22,3 21,3M5,17L8.5,12.5L11,15.5L14.5,11L19,17H5Z" />
      </svg>`,
    });


};