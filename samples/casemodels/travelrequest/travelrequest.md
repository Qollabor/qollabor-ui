# Description Travel request model

## Intro
This case model is used as an example to build the Cafienne UI.
We don't use the case file in this model since the first version of the Cafienne UI doesn't support the case file.

## Stage Request

This stage is in state `Active` by default (transition: create).
Also task `Request Travel` is in state `Active` by default.
This stage doesn't auto-complete.<br/>
We have an `Exit Sentry` which tells us that only when the `Approve` stage goes into
state `Terminated` also the `Request` stage terminates.

The user with Role `Employee` is able to change (transition: `parentSuspend`)
the 'Request Travel' task into `Suspended` state, but the Approver could always
rollback this task from state `Suspended` -> `Active` (transition: `parentResume`) with the `Add Information` task.
The `Request` stage will never complete by itself because the `Request travel` task maybe
reopens by the `Add information` task in the Approve stage.

## Stage Approve

In this stage the Manager role is able to approve/decline a request or inform the Employee
that extra information is needed in the `Request Travel` task.

### Task: Add Information

When submitting this task, the `Request Travel` task transitions
from `Suspended` to `Active` with transition `parentResume`.

### Task: Approve Request

This task can have two transition possibilities. We use this to identify if the manager
is approving or declining the request.<br/>
When the task goes into state `Completed` (transition: complete) the manager excepts the request,
when the task goes into state `Terminated` (transition: exit) the manager declines the request.

These two transitions we use as a condition on the `Entry Sentry` for the `Book` stage.

When one of these two transitions take place,
the whole `Approve` stage terminates by the `Exit Sentry`
and automatically terminates the `Request` stage.

## Stage Book & Invoice

Very simple stages which have an auto-complete property.
The whole case will also auto-complete when all stages
are completed or terminated.
