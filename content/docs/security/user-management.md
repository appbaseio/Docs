---
title: 'User Management'
meta_title: 'User Management - Security'
meta_description: 'User Management allows you to add additional user login access to the appbase.io dashboard.'
keywords:
    - concepts
    - appbaseio
    - user management
    - api
sidebar: 'docs'
---

User Management allows you to add additional user login access to the appbase.io dashboard. You can access User Management from the `Security` view in your dashboard.

![usermanagement](https://i.imgur.com/yoCzEmG.png)

Users need to sign in via the login URL provided in the dashboard using the provided username and password. Passwords are encrypted and can't be seen once set - they can always be reset by an admin user or a user having the `user-management` scope.

## Create A New User

![Create a New User](https://i.imgur.com/ocOgZpD.png)

When creating a new user, you can either provide admin privileges or set the specific scopes (access controls) this user can access via UI / APIs. Please read about each scope and its privileges carefully before granting access to the user.

- **Develop** users can access the `elasticsearch`. For example, they can do the following actions:
    - Create/Delete indices
    - Import data to any index
    - Browse data
    - Search Preview
    - Access the request logs

![develop](https://i.imgur.com/WdY8mMx.png)

- **Analytics** users with analytics scope can access all the analytics views to evaluate the search performance. Additionally, they'll get the monthly insights report.

![analytics](https://i.imgur.com/Ts78oD2.png)

- **Curated Insights** users can access the `Curated Insights` view in `dashboard` to subscribe to appbase.io curated insights. You can read more about it [here](/docs/analytics/curated-insights/).

- **Search Relevancy** users with this scope has access to `Search Relevancy` and `Develop` views. This scope is suitable for users who maintain the search in your team. Check the `Search Relevancy` [docs](/docs/search/relevancy/) to know more.

![relevancy](https://i.imgur.com/FcQysyK.png)

- **Access Control** users can access the [API Credentials](/docs/security/credentials/), [Role Based Access Control](/docs/security/role/) and [Search Template](/docs/security/template/) views.

- **User Management** users with this scope can do the following tasks:
    - Create new users
    - Edit the existing users. For an example, modify the privileges for other users
    - Delete the existing users

- **Billing** scope can be helpful to people who manage finance in your team. The `billing` scope only allows access to the `Billing` page in dashboard.

- **Downtime Alerts** In case of Elasticsearch downtime we send emails to all the users with `Downtime Alerts` scope, alerting them about the downtimes.



## User Management vs API Credentials

When you need to provide GUI access to the dashboard, we recommend creating a new user. On the other hand, when you need to offer programmatic access to a subset of the APIs / or set restrictions based on IPs, HTTP Referers, fields, time, we recommend creating an [API credential](/docs/security/credentials/#adding-and-updating-credentials).
