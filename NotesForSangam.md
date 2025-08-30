# Sangam Note

## Things to implement
1. Properly manage the toastr notification
2. Make the status(is_active) to work from index page for all. And do using a generic function which will be used everywhere
3. Upgrade the ui
4. Make the landing page a bit better. Also fetch quiz and result before using logged in.
5. Make the user password update, settings etc.
6. Try to change the user from the admins table to the user in users table so that in the future multi-tenant won't be complex
7. Research how the roles and permission can be implement through the react and apply it.
8. Backend controller function response fix. Also apply the app()->isLocal() method to show the response required by the local and production field.
9. Upgrade the controller so that both the api.php and web.php use same controller without disturbing the response required by the normal request, ajax and react request.
10. Integrate the insights from here into the personal cms after completing the design upgrade of the personal cms backend (admin panel).
11. In three months time build a portfolio website from the personal cms and make it work on blade engine and react both. To be exact it should be different website i.e one combo of react and laravel and another complete laravel. One backend to power two views.


## Things Done in quiz system
1. Basic quiz system made
2. Tailwind downgraded to v3 to work
3. Converted to hooks
4. Auth using sanctum

## Improvement idea for quiz system
1. Make a custom color pick of about 20 to 30 colors.
2. Integrate the custom color picker functionality with difficulty so when creating the difficulty use can give the color as indicator and would helpful enough to assign different colors for different difficulty
3. In Play zone, make it so that when user clicks wrong or right answer all wrong will be highlight and cross icon to show and for right one hightlight differently. (also reaseach about game engine maybe that will help to make this quiz system more advanced).
4. Implement events where player can go on playing to infinity, i.e not stopping until wrong answer is submitted
5. In quiz creation, mae the edit workable. Also, add a feature where the create can select the question for their quiz and selected question to be shown. And a feature where they can just click or check the random button which in the future when played the quiz automatically fetches the quesition from the cateogry and difficulty
6. Improve the overall design and ui in something lookable


