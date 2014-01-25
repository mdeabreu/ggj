// Checks if two rectangles intersect, returns true if there is an intersection
// and false if there is not
function checkRectIntersect(rect1, rect2) {
    // Check if two rectangles intersect

    if ((rect1.x >= rect2.x + rect2.width) ||
        (rect1.y >= rect2.y + rect2.height) ||
        (rect2.x >= rect1.x + rect1.width) ||
        (rect2.y >= rect1.y + rect1.height)) {
        return true;
       }
    return false;
}