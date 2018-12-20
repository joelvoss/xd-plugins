/**
 * Peter Flynn
 *
 * Sample plugin similar to Sketch's "Dynamic Button" plugin. Updates a frame shape to wrap a text element exactly
 * with a specified amount of padding:
 * 1. Draw a rectangle and change its layer name to the two H/V padding values separated by spaces
 *   (e.g. layer name "20 10" means 20 px of left/right padding and 10 px top/bottom padding)
 * 2. Create a text element of any size
 * 3. Select both and run "Update Button Padding" - the rectangle will be moved & resized to wrap the text with
 *   the exact amount of padding you specified.
 * 4. Change the padding or change the text and redo step 3 to update the frame
 */

/*jshint esnext: true */
/*globals console, require */

function updatePadding(selection, root) {
  // Get item with pad string
  let padNode = null;
  let targetNode = null;
  selection.items.forEach(item => {
    if (item.name.substr(0, 3) === "pad") {
      padNode = item;
    } else {
      targetNode = item;
    }
  });

  // Extract H/V padding values from layer name
  const padding = padNode.name.match(/\b(\d+)\b/);

  let pT = 0;
  let pR = 0;
  let pB = 0;
  let pL = 0;
  if (padding.length === 1) {
    pT = parseFloat(padding);
    pR = parseFloat(padding);
    pB = parseFloat(padding);
    pL = parseFloat(padding);
  }
  if (padding.length === 2) {
    pT = parseFloat(padding[0]);
    pR = parseFloat(padding[1]);
    pB = parseFloat(padding[0]);
    pL = parseFloat(padding[1]);
  }
  if (padding.length === 3) {
    pT = parseFloat(padding[0]);
    pR = parseFloat(padding[1]);
    pB = parseFloat(padding[2]);
    pL = parseFloat(padding[1]);
  }
  if (padding.length === 4) {
    pT = parseFloat(padding[0]);
    pR = parseFloat(padding[1]);
    pB = parseFloat(padding[2]);
    pL = parseFloat(padding[3]);
  }

  const contentBounds = targetNode.boundsInParent;
  padNode.resize(
    contentBounds.width + pR + pL,
    contentBounds.height + pT + pB
  );
  padNode.placeInParentCoordinates(targetNode.localBounds, {
    // move frame's visual top left to appropriate place
    x: contentBounds.x - pL,
    y: contentBounds.y - pT
  });
}

module.exports = {
  commands: {
    updatePadding: updatePadding
  }
};
