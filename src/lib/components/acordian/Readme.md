Refer Accordions for examples


```jsx harmony

<div>
			<input style={{marginLeft: '4rem'}} onChange={this.onChange}/>
			<Accordion align="justified" type="gray">
				<AccordionHeaderList>
					<AccordionHeader onActivation={this.onActivation}><Icon name="contact" width="25" height="25" color="gray" /></AccordionHeader>
					<AccordionHeader><Icon name="dial" width="25" height="25" color="gray" /></AccordionHeader>
				</AccordionHeaderList>
				<AccordionBodyList>
					<AccordionBody className="pad-left-1r">
						<h4>Testing Button {this.state.value}</h4>
						<p>
							Sample Accordion body
						</p>
					</AccordionBody>
					<AccordionBody className="pad-left-1r">
						<h4>Testing Button 2</h4>
						<p>
							This is just to demonstarate the use of Accordions.
							You could also make a `ul` inside like this:
						</p>
					</AccordionBody>
				</AccordionBodyList>
			</Accordion>
		</div>
```
