const g="data:text/markdown;base64,IyMgU29sZSBNZXVuacOocmUgd2l0aCBCcm93biBCdXR0ZXIsIENhcGVycywgYW5kIExlbW9uDQoNCiMjIyBJbmdyZWRpZW50cw0KLSA0IHNvbGUgZmlsbGV0cywgc2tpbmxlc3MNCi0gU2FsdCBhbmQgZnJlc2hseSBncm91bmQgYmxhY2sgcGVwcGVyDQotIDEvMiBjdXAgYWxsLXB1cnBvc2UgZmxvdXIsIGZvciBkcmVkZ2luZw0KLSA0IHRhYmxlc3Bvb25zIHVuc2FsdGVkIGJ1dHRlcg0KLSAyIHRhYmxlc3Bvb25zIG9saXZlIG9pbA0KLSAxLzQgY3VwIGZyZXNoIGxlbW9uIGp1aWNlIChhYm91dCAyIGxlbW9ucykNCi0gMS80IGN1cCBjYXBlcnMsIGRyYWluZWQNCi0gMiB0YWJsZXNwb29ucyBjaG9wcGVkIGZyZXNoIHBhcnNsZXkNCi0gTGVtb24gd2VkZ2VzLCBmb3Igc2VydmluZw0KDQojIyMgSW5zdHJ1Y3Rpb25zDQoNCjEuICoqUHJlcGFyZSB0aGUgRmlsbGV0czoqKg0KICAgLSBQYXQgdGhlIHNvbGUgZmlsbGV0cyBkcnkgd2l0aCBwYXBlciB0b3dlbHMuIFNlYXNvbiBib3RoIHNpZGVzIHdpdGggc2FsdCBhbmQgZnJlc2hseSBncm91bmQgYmxhY2sgcGVwcGVyLg0KICAgLSBTcHJlYWQgdGhlIGFsbC1wdXJwb3NlIGZsb3VyIG9uIGEgcGxhdGUgb3Igc2hhbGxvdyBkaXNoLiBEcmVkZ2UgZWFjaCBmaWxsZXQgaW4gdGhlIGZsb3VyLCBzaGFraW5nIG9mZiB0aGUgZXhjZXNzLg0KDQoyLiAqKkNvb2sgdGhlIFNvbGU6KioNCiAgIC0gSGVhdCAyIHRhYmxlc3Bvb25zIG9mIHRoZSBidXR0ZXIgYW5kIHRoZSBvbGl2ZSBvaWwgaW4gYSBsYXJnZSBza2lsbGV0IG92ZXIgbWVkaXVtLWhpZ2ggaGVhdC4gT25jZSB0aGUgYnV0dGVyIGJlZ2lucyB0byBmb2FtLCBhZGQgdGhlIGZpbGxldHMsIHdvcmtpbmcgaW4gYmF0Y2hlcyBpZiBuZWNlc3NhcnkgdG8gYXZvaWQgY3Jvd2RpbmcgdGhlIHBhbi4NCiAgIC0gQ29vayB0aGUgZmlsbGV0cyBmb3IgYWJvdXQgMi0zIG1pbnV0ZXMgb24gZWFjaCBzaWRlLCBvciB1bnRpbCBnb2xkZW4gYnJvd24gYW5kIGp1c3QgY29va2VkIHRocm91Z2guIFRyYW5zZmVyIHRoZSBjb29rZWQgZmlsbGV0cyB0byBhIHdhcm0gcGxhdGUuDQoNCjMuICoqTWFrZSB0aGUgQnJvd24gQnV0dGVyIFNhdWNlOioqDQogICAtIFJlZHVjZSB0aGUgaGVhdCB0byBtZWRpdW0gYW5kIGFkZCB0aGUgcmVtYWluaW5nIDIgdGFibGVzcG9vbnMgb2YgYnV0dGVyIHRvIHRoZSBzYW1lIHNraWxsZXQuIENvb2ssIHN0aXJyaW5nIG9mdGVuLCB1bnRpbCB0aGUgYnV0dGVyIHR1cm5zIGEgbGlnaHQgYnJvd24gY29sb3IgYW5kIGRldmVsb3BzIGEgbnV0dHkgYXJvbWEsIGFib3V0IDIgbWludXRlcy4NCiAgIC0gU3RpciBpbiB0aGUgZnJlc2ggbGVtb24ganVpY2UgYW5kIGNhcGVycywgY2FyZWZ1bGx5IHNjcmFwaW5nIHVwIGFueSBicm93bmVkIGJpdHMgZnJvbSB0aGUgYm90dG9tIG9mIHRoZSBwYW4uDQogICANCjQuICoqU2VydmU6KioNCiAgIC0gUG91ciB0aGUgYnJvd24gYnV0dGVyIHNhdWNlIG92ZXIgdGhlIGNvb2tlZCBzb2xlIGZpbGxldHMuDQogICAtIFNwcmlua2xlIHdpdGggdGhlIGNob3BwZWQgcGFyc2xleS4NCiAgIC0gU2VydmUgaW1tZWRpYXRlbHkgd2l0aCBsZW1vbiB3ZWRnZXMgb24gdGhlIHNpZGUuDQoNCiMjIyBXaW5lIFBhaXJpbmcNCi0gU2VydmUgd2l0aCBhIGdsYXNzIG9mIExvdWlzIFJvZWRlcmVyIENyaXN0YWwgQnJ1dCAyMDEyIHRvIGNvbXBsZW1lbnQgdGhlIHJpY2huZXNzIG9mIHRoZSBzb2xlIGFuZCB0aGUgY2l0cnVzIG5vdGVzIG9mIHRoZSBkaXNoLg==";export{g as default};
