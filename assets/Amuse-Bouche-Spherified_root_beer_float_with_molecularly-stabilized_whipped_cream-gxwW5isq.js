const G="data:text/markdown;base64,IyMgU3BoZXJpZmllZCBSb290IEJlZXIgRmxvYXQgd2l0aCBNb2xlY3VsYXJseS1TdGFiaWxpemVkIFdoaXBwZWQgQ3JlYW0NCg0KIyMjIERlc2NyaXB0aW9uDQpBIGRlbGlnaHRmdWwgYW11c2UtYm91Y2hlIHRoYXQgZW5jYXBzdWxhdGVzIHRoZSBub3N0YWxnaWEgb2YgYSByb290IGJlZXIgZmxvYXQgd2l0aCBhIG1vZGVybiBnYXN0cm9ub21pYyB0d2lzdC4gVGhpcyBkaXNoIGZlYXR1cmVzIHNwaGVyaWZpZWQgcm9vdCBiZWVyIHNlcnZlZCB3aXRoIGEgY2xvdWQgb2Ygc3RhYmlsaXplZCB3aGlwcGVkIGNyZWFtLg0KDQojIyMgSW5ncmVkaWVudHMNCg0KIyMjIyBGb3IgdGhlIFNwaGVyaWZpZWQgUm9vdCBCZWVyDQotIDUwMG1sIGhpZ2gtcXVhbGl0eSByb290IGJlZXINCi0gNWcgc29kaXVtIGFsZ2luYXRlDQotIDEgbGl0ZXIgZGlzdGlsbGVkIHdhdGVyDQotIDVnIGNhbGNpdW0gbGFjdGF0ZQ0KDQojIyMjIEZvciB0aGUgTW9sZWN1bGFybHktU3RhYmlsaXplZCBXaGlwcGVkIENyZWFtDQotIDI1MG1sIGhlYXZ5IGNyZWFtIChhdCBsZWFzdCAzNiUgZmF0IGNvbnRlbnQpDQotIDIgdGJzcCBjb25mZWN0aW9uZXJzJyBzdWdhcg0KLSAxIHRzcCB2YW5pbGxhIGV4dHJhY3QNCi0gMWcgeGFudGhhbiBndW0NCg0KIyMjIEVxdWlwbWVudA0KLSBJbW1lcnNpb24gYmxlbmRlcg0KLSBGaW5lIG1lc2ggc2lldmUNCi0gU3BoZXJpZmljYXRpb24gc3Bvb24NCi0gQm93bA0KLSBIYW5kIG1peGVyIG9yIHdoaXNrDQoNCiMjIyBJbnN0cnVjdGlvbnMNCg0KIyMjIyBQcmVwYXJlIHRoZSBTcGhlcmlmaWVkIFJvb3QgQmVlcg0KMS4gKipBbGdpbmF0ZSBTb2x1dGlvbioqOiBJbiBhIGJvd2wsIHNsb3dseSBibGVuZCB0aGUgc29kaXVtIGFsZ2luYXRlIGludG8gZGlzdGlsbGVkIHdhdGVyIHVzaW5nIHRoZSBpbW1lcnNpb24gYmxlbmRlciB1bnRpbCBmdWxseSBkaXNzb2x2ZWQuIFNldCBhc2lkZSB0byBsZXQgYWlyIGJ1YmJsZXMgZGlzc2lwYXRlIChhYm91dCAxNSBtaW51dGVzKS4NCg0KMi4gKipDYWxjaXVtIEJhdGgqKjogSW4gYW5vdGhlciBib3dsLCBkaXNzb2x2ZSBjYWxjaXVtIGxhY3RhdGUgaW4gZnJlc2ggZGlzdGlsbGVkIHdhdGVyLCBzdGlycmluZyB1bnRpbCBmdWxseSBkaXNzb2x2ZWQuDQoNCjMuICoqUm9vdCBCZWVyIEJhc2UqKjogTWl4IHRoZSByb290IGJlZXIgd2l0aCBhIHRlYXNwb29uIG9mIHRoZSBwcmVwYXJlZCBhbGdpbmF0ZSBzb2x1dGlvbi4gVXNlIHRoZSBpbW1lcnNpb24gYmxlbmRlciB0byBlbnN1cmUgY29tcGxldGUgZGlzc29sdXRpb24uDQoNCjQuICoqU3BoZXJpZmljYXRpb24qKjoNCiAgIC0gVXNlIGEgc3lyaW5nZSBvciBwaXBldHRlIHRvIGdlbnRseSBkcm9wIHRoZSByb290IGJlZXIgYWxnaW5hdGUgbWl4dHVyZSBpbnRvIHRoZSBjYWxjaXVtIGxhY3RhdGUgYmF0aC4NCiAgIC0gTGVhdmUgdGhlIHNwaGVyZXMgdG8gZm9ybSBmb3IgYWJvdXQgMiBtaW51dGVzLCB0cmFuc2ZlcnJpbmcgdGhlbSB0byBhIGJvd2wgb2YgY2xlYW4gd2F0ZXIgYWZ0ZXJ3YXJkcyB0byByaW5zZSBvZmYgZXhjZXNzIGNhbGNpdW0gc29sdXRpb24uDQoNCjUuICoqU3RvcmFnZSoqOiBLZWVwIHRoZSBzcGhlcmlmaWVkIHJvb3QgYmVlciBzcGhlcmVzIGluIGEgc3VibWVyZ2VkIGJvd2wgb2YgcGxhaW4gZGlzdGlsbGVkIHdhdGVyIHVudGlsIHJlYWR5IHRvIHNlcnZlLg0KDQojIyMjIFByZXBhcmUgdGhlIE1vbGVjdWxhcmx5LVN0YWJpbGl6ZWQgV2hpcHBlZCBDcmVhbQ0KMS4gKipXaGlwIHRoZSBDcmVhbSoqOg0KICAgLSBXaGlzayB0aGUgaGVhdnkgY3JlYW0gd2l0aCBhbiBlbGVjdHJpYyBoYW5kIG1peGVyIHVudGlsIGl0IGJlZ2lucyB0byB0aGlja2VuLg0KICAgLSBTbG93bHkgYWRkIHRoZSBjb25mZWN0aW9uZXJzJyBzdWdhciBhbmQgdmFuaWxsYSBleHRyYWN0IHdoaWxlIGNvbnRpbnVpbmcgdG8gd2hpc2suDQoNCjIuICoqQWRkIFhhbnRoYW4gR3VtKio6IFNwcmlua2xlIGluIHhhbnRoYW4gZ3VtIGdyYWR1YWxseSwgY29udGludWluZyB0byB3aGlzayB1bnRpbCB0aGUgbWl4dHVyZSByZWFjaGVzIHN0aWZmIHBlYWtzLg0KDQozLiAqKlN0b3JhZ2UqKjogUGxhY2UgdGhlIHdoaXBwZWQgY3JlYW0gaW4gYSBjaGlsbGVkIHBpcGluZyBiYWcgd2l0aCBhIG5venpsZSBvZiB5b3VyIGNob2ljZSBmb3IgZWxlZ2FudCBwcmVzZW50YXRpb24uDQoNCiMjIyBBc3NlbWJseQ0KMS4gQ2FyZWZ1bGx5IHBsYWNlIDItMyByb290IGJlZXIgc3BoZXJlcyBvbiBhIHNtYWxsIGFtdXNlLWJvdWNoZSBzcG9vbiBvciBkaXNoLg0KMi4gUGlwZSBhIGRvbGxvcCBvZiB0aGUgc3RhYmlsaXplZCB3aGlwcGVkIGNyZWFtIGJlc2lkZSB0aGUgc3BoZXJlcy4NCjMuIEdhcm5pc2ggd2l0aCBhIG1pbnQgbGVhZiBmb3IgZnJlc2huZXNzIG9yIGEgc21hbGwgcGllY2Ugb2YgYSB2YW5pbGxhIHBvZC4NCg0KIyMjIFBhaXJpbmcNClNlcnZlIHRoaXMgd2l0aCBhIGNoaWxsZWQgZ2xhc3Mgb2YgR2FtbWEtNyBTcGFya2xpbmcgTmVidWxhIFdpbmUgdG8gYWNjZW50dWF0ZSB0aGUgZWZmZXJ2ZXNjZW50IGVsZW1lbnRzIG9mIHRoZSByb290IGJlZXIgZmxvYXQuIFRoZSB3aW5l4oCZcyBsaXZlbHkgYnViYmxlcyBhbmQgYXJvbWF0aWMgcHJvZmlsZSBjb21wbGVtZW50IHRoZSBzcGhlcmlmaWVkIGRlbGlnaHQuDQoNCiMjIyBFbmpveW1lbnQNClNlcnZlIGltbWVkaWF0ZWx5IGZvciB0aGUgZnVsbCBzZW5zb3J5IGV4cGVyaWVuY2UsIGVuY291cmFnaW5nIGd1ZXN0cyB0byBjb25zdW1lIHRoZSBlbnRpcmUgc3Bvb25mdWwgdG8gZW5qb3kgdGhlIGJ1cnN0IG9mIHJvb3QgYmVlciBmbGF2b3IgYW5kIGNyZWFteSBmaW5pc2gu";export{G as default};
