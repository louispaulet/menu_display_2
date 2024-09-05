const g="data:text/markdown;base64,IyMjIFNlYXJlZCBGb2llIEdyYXMgd2l0aCBQb2FjaGVkIFBlYXIgYW5kIEJyaW9jaGUgVG9hc3QNCg0KIyMjIyBJbmdyZWRpZW50czoNCi0gKipGb2llIEdyYXM6KioNCiAgLSA0IHNsaWNlcyBvZiBmcmVzaCBmb2llIGdyYXMsIGFwcHJveGltYXRlbHkgMiBveiBlYWNoDQogIC0gU2FsdCBhbmQgZnJlc2hseSBncm91bmQgYmxhY2sgcGVwcGVyIA0KDQotICoqUG9hY2hlZCBQZWFyczoqKg0KICAtIDIgcmlwZSBidXQgZmlybSBwZWFycywgcGVlbGVkLCBjb3JlZCwgYW5kIGhhbHZlZA0KICAtIDIgY3VwcyBkcnkgd2hpdGUgd2luZQ0KICAtIDEgY3VwIHdhdGVyDQogIC0gMS8yIGN1cCBncmFudWxhdGVkIHN1Z2FyDQogIC0gMSBjaW5uYW1vbiBzdGljaw0KICAtIDEgc3RhciBhbmlzZQ0KDQotICoqQnJpb2NoZSBUb2FzdDoqKg0KICAtIDQgc2xpY2VzIGJyaW9jaGUgYnJlYWQNCiAgLSAxIHRhYmxlc3Bvb24gdW5zYWx0ZWQgYnV0dGVyDQoNCi0gKipHYXJuaXNoIGFuZCBTYXVjZToqKg0KICAtIDIgdGFibGVzcG9vbnMgYmFsc2FtaWMgcmVkdWN0aW9uDQogIC0gRnJlc2ggbWljcm9ncmVlbnMgKHN1Y2ggYXMgd2F0ZXJjcmVzcyBvciBhcnVndWxhKQ0KDQojIyMjIEluc3RydWN0aW9uczoNCg0KMS4gKipQb2FjaGluZyB0aGUgUGVhcnM6KioNCg0KICAgLSBJbiBhIG1lZGl1bSBzYXVjZXBhbiwgY29tYmluZSB0aGUgd2luZSwgd2F0ZXIsIHN1Z2FyLCBjaW5uYW1vbiBzdGljaywgYW5kIHN0YXIgYW5pc2UuIFN0aXIgdW50aWwgdGhlIHN1Z2FyIGhhcyBkaXNzb2x2ZWQuDQogICAtIEFkZCB0aGUgcGVhciBoYWx2ZXMgdG8gdGhlIHNhdWNlcGFuIGFuZCBicmluZyB0byBhIGdlbnRsZSBzaW1tZXIgb3ZlciBtZWRpdW0gaGVhdC4gQ292ZXIgYW5kIHBvYWNoIGZvciAxNS0yMCBtaW51dGVzIHVudGlsIHRoZSBwZWFycyBhcmUgdGVuZGVyIGJ1dCBub3QgbXVzaHkuDQogICAtIFJlbW92ZSB0aGUgcGVhcnMgZnJvbSB0aGUgbGlxdWlkIGFuZCBzZXQgYXNpZGUgdG8gY29vbC4gU3RyYWluIHRoZSBwb2FjaGluZyBsaXF1aWQgYW5kIHJlc2VydmUgZm9yIGFub3RoZXIgdXNlIGlmIGRlc2lyZWQuDQoNCjIuICoqUHJlcGFyaW5nIHRoZSBCcmlvY2hlIFRvYXN0OioqDQoNCiAgIC0gUHJlaGVhdCBhIGxhcmdlIHNraWxsZXQgb3ZlciBtZWRpdW0gaGVhdC4gTGlnaHRseSBidXR0ZXIgZWFjaCBzaWRlIG9mIHRoZSBicmlvY2hlIHNsaWNlcy4NCiAgIC0gVG9hc3QgdGhlIGJyZWFkIHNsaWNlcyBpbiB0aGUgc2tpbGxldCB1bnRpbCBnb2xkZW4gYnJvd24gb24gYm90aCBzaWRlcy4gUmVtb3ZlIGZyb20gaGVhdCBhbmQgc2V0IGFzaWRlLg0KDQozLiAqKkNvb2tpbmcgdGhlIEZvaWUgR3JhczoqKg0KDQogICAtIFNjb3JlIHRoZSBmb2llIGdyYXMgb24gb25lIHNpZGUgd2l0aCBhIHNoYXJwIGtuaWZlLCBjcmVhdGluZyBhIHNoYWxsb3cgY3Jvc3NoYXRjaCBwYXR0ZXJuLg0KICAgLSBTZWFzb24gYm90aCBzaWRlcyB3aXRoIHNhbHQgYW5kIHBlcHBlci4NCiAgIC0gSGVhdCBhIG5vbi1zdGljayBza2lsbGV0IG92ZXIgaGlnaCBoZWF0IHVudGlsIHZlcnkgaG90LiBBZGQgdGhlIGZvaWUgZ3JhcyBzbGljZXMgYW5kIHNlYXIgZm9yIGFwcHJveGltYXRlbHkgMzAgc2Vjb25kcyB0byAxIG1pbnV0ZSBvbiBlYWNoIHNpZGUgdW50aWwgZ29sZGVuIGJyb3duIGFuZCBjYXJhbWVsaXplZC4gRm9pZSBncmFzIHNob3VsZCBiZSBzZWFyZWQgb3V0c2lkZSBidXQgcmVtYWluIHNvZnQgaW5zaWRlLg0KICAgLSBSZW1vdmUgZm9pZSBncmFzIGZyb20gdGhlIHNraWxsZXQgYW5kIGxldCBpdCByZXN0IGJyaWVmbHkgb24gYSBwYXBlciB0b3dlbCB0byBhYnNvcmIgZXhjZXNzIGZhdC4NCg0KNC4gKipBc3NlbWJseToqKg0KDQogICAtIFBsYWNlIGEgc2xpY2Ugb2YgdG9hc3RlZCBicmlvY2hlIG9uIGVhY2ggc2VydmluZyBwbGF0ZS4NCiAgIC0gVG9wIGVhY2ggd2l0aCBhIHNlYXJlZCBmb2llIGdyYXMgcGllY2UuDQogICAtIEFycmFuZ2UgYSBwb2FjaGVkIHBlYXIgaGFsZiBuZXh0IHRvIHRoZSBmb2llIGdyYXMuDQogICAtIERyaXp6bGUgYmFsc2FtaWMgcmVkdWN0aW9uIGFyb3VuZCB0aGUgcGxhdGUgYW5kIGdhcm5pc2ggd2l0aCBtaWNyb2dyZWVucyBmb3IgYSBwb3Agb2YgY29sb3IgYW5kIGZyZXNobmVzcy4NCg0KNS4gKipTZXJ2aW5nIGFuZCBQYWlyaW5nOioqDQoNCiAgIC0gU2VydmUgaW1tZWRpYXRlbHkuIFBhaXIgd2l0aCBhIGdsYXNzIG9mICoqQmlsbGVjYXJ0LVNhbG1vbiBDdXbDqWUgTmljb2xhcyBGcmFuw6dvaXMgQmlsbGVjYXJ0IDIwMDYqKiBmb3IgYW4gZXhxdWlzaXRlIGRpbmluZyBleHBlcmllbmNlLg0KDQpFbmpveSB5b3VyIGdvdXJtZXQgYXBwZXRpemVyIHRoYXQgYmVhdXRpZnVsbHkgYmFsYW5jZXMgdGhlIHJpY2gsIGJ1dHRlcnkgZm9pZSBncmFzIHdpdGggdGhlIHN3ZWV0IGVsZWdhbmNlIG9mIHBvYWNoZWQgcGVhcnMgYW5kIHRoZSBkZWxpY2F0ZSBjcnVuY2ggb2YgYnJpb2NoZSB0b2FzdC4=";export{g as default};
