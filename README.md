# Team Name: Digital Innovators

**Project:** CSC 216 Lab 2 team website.

**Live site:** https://rosedev687.github.io/team-website/

## Team

| Name | Registration no. | GitHub username |
|---|---|---|
| Rose Jepchirchir | COM/3460/26 | RoseDev687 |
| Evance Ochieng | COM/3480/26 | Evance |

## Who drove each part

- Part 0, 2, 4: Evance Ochieng
- Part 1, 3: Rose Jepchirchir

## Personalisation

- **Our colours:** Teal (`#0B6B6D`) and navy (`#102A43`), with light and dark themes.
- **Projects we added:** Personal Portfolio Website, Simple Calculator, and Git Collaboration Practice.
- **Extension challenge completed:** Challenge 3, completed together by Rose Jepchirchir and Evance Ochieng.

## Reflection

1. A `<button>` works with the keyboard by default: users can focus it with Tab and activate it with Enter or Space. Screen readers also announce it as a button. A clickable `<div>` would need extra code for those behaviors. Keyboard users and people using screen readers would be affected.

2. Without `defer`, the browser runs the script as soon as it reaches it in the `<head>`, pausing HTML parsing. The page elements may not exist yet, so JavaScript that looks them up can get `null`. The script could fail or page features might not work.

3. If visitor-entered titles were inserted using `innerHTML`, HTML or JavaScript in a title could be interpreted as code. This could let someone inject harmful content into the page. `textContent` displays the title as plain text instead.

4. JavaScript validation runs in the visitor’s browser, where it can be bypassed or changed. Someone could send data directly to the server without using the form. The server must validate the data too, to reject invalid or harmful submissions.

5. Home and Contact share the same origin when opened through Live Server, so they can use the same saved theme setting. A double-clicked file uses a `file://` address, while Live Server uses an `http://` address. Those are different origins, so their saved theme settings are separate.

6. The site header and footer are repeated across `index.html`, `projects.html`, and `contact.html`. If we change them, we have to update each file, and they can become inconsistent. A templating system or shared components could keep the common parts in one place and reuse them across pages.