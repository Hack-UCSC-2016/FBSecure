#FBSecure
A basic add-on that encrypts your messages on Facebook Messenger, protecting your privacy and your friends' privacy.

## Inspiration
We were inspired by the film, Citizenfour, a documentary following Edward Snowden and his involvement in the NSA spying scandal.  It made us realize the impact that encryption has on peoples lives by protecting the whistleblowers that improve our world's social justice and equality.

## What it does
FBSecure will encrypt messages on Facebook Messenger between users of FBSecure, but still allow unencrypted messaging between people without FBSecure.

## How we built it
We made a Chrome plugin using the cryptico Javascript encryption library to create RSA keys for FBSecure users.  FBSecure users can send each other encrypted messages once they exchange their public keys.  They encrypt their messages using their public key and decrypt messages sent to them using their private key.

## Challenges we ran into
We had tons of trouble figuring out how to submit messages from the text box on the Facebook site.  We spent several hours attempting multiple approaches towards this problem, then asked 2 mentors for help, and spent several more hours until we eventually figured out the problem.

## Accomplishments that we're proud of
For most of the development, we were forced to use a bookmarklet to send messages through Facebook.  Once we figured out the problem, we were extremely proud since the program had now become much easier  and smoother to use.

We are also happy with the fact that we achieved all our functional goals within our time limit.  We even met a few stretch goals such as importing/exporting/resetting settings.

## What we learned
We learned how to work with RSA encryption libraries and how to build Chrome extensions.

## What's next for FBSecure
We'd want to implement FBSecure on more browsers and even mobile platforms, so more people have access to encrypted, secure communication.  Other features that we'd want to implement are the abilities to have dedicated chat windows instead of using Facebook Messenger nubs, to support group chats on Facebook Messenger, and to have a local lock mechanism to prevent other users from reading your encrypted messages from your own computer.
